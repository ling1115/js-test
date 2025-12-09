<script setup lang="ts">
import type { TabsProps } from 'ant-design-vue'
import type { CSSProperties, ComponentPublicInstance } from 'vue'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  shallowRef,
  useAttrs,
  watch,
} from 'vue'

type Key = string | number

interface Emits {
  (e: 'update:activeKey', key: Key): void
  (e: 'change', key: Key): void
  (e: 'tabClick', key: Key, evt: Event): void
  (e: 'tabScroll', evt: { direction: 'left' | 'right' | 'top' | 'bottom' }): void
  (e: 'edit', targetKey: Key | MouseEvent, action: 'add' | 'remove'): void
}

/* ====== 组件配置 ====== */
defineOptions({ name: 'SmartTabs', inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    activeKey?: Key
    type?: TabsProps['type']
    size?: TabsProps['size']
    tabPosition?: TabsProps['tabPosition']
    centered?: boolean
    hideAdd?: boolean
    animated?: boolean | { inkBar: boolean, tabPane: boolean }
    tabBarGutter?: number
    tabBarStyle?: CSSProperties
  }>(),
  {
    type: 'line',
    size: 'middle',
    tabPosition: 'top',
    centered: false,
    hideAdd: false,
    animated: true,
    tabBarGutter: undefined,
    tabBarStyle: () => ({}),
  },
)

const emit = defineEmits<Emits>()
const attrs = useAttrs()

const activeKey = computed<Key>({
  get: () => props.activeKey ?? '',
  set: val => emit('update:activeKey', val),
})

const isHorizontal = computed(() => props.tabPosition === 'top' || props.tabPosition === 'bottom')

const tabsRef = shallowRef<ComponentPublicInstance | null>(null)
const navWrapRef = shallowRef<HTMLElement | null>(null)
const navListRef = shallowRef<HTMLElement | null>(null)
const prevBtnRef = shallowRef<HTMLButtonElement | null>(null)
const nextBtnRef = shallowRef<HTMLButtonElement | null>(null)

const isOverflowing = ref(false)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)

const showScrollControls = computed(() => isHorizontal.value && isOverflowing.value)

const onChange = (key: Key) => emit('change', key)
const onTabClick = (key: Key, evt: Event) => emit('tabClick', key, evt)
const onEdit = (targetKey: Key | MouseEvent, action: 'add' | 'remove') => emit('edit', targetKey, action)

const canUseDom = typeof window !== 'undefined'
let resizeObserver: ResizeObserver | null = null
let rafId: number | null = null

const wheelOptions: AddEventListenerOptions = { passive: false }

const scheduleOverflowSync = () => {
  if (!canUseDom) return
  if (rafId !== null) window.cancelAnimationFrame(rafId)
  rafId = window.requestAnimationFrame(() => {
    rafId = null
    updateOverflowState()
  })
}

function resolveNavDom() {
  const root = (tabsRef.value?.$el ?? null) as HTMLElement | null
  if (!root) return

  navWrapRef.value = root.querySelector('.ant-tabs-nav-wrap')
  navListRef.value = root.querySelector('.ant-tabs-nav-list')

  const prevButton =
    root.querySelector<HTMLButtonElement>('.ant-tabs-nav-prev button') ??
    root.querySelector<HTMLButtonElement>('.ant-tabs-nav-prev')

  const nextButton =
    root.querySelector<HTMLButtonElement>('.ant-tabs-nav-next button') ??
    root.querySelector<HTMLButtonElement>('.ant-tabs-nav-next')

  prevBtnRef.value = prevButton ?? null
  nextBtnRef.value = nextButton ?? null
}

function isButtonEnabled(btn: HTMLButtonElement | null) {
  if (!btn) return false
  if (btn.disabled) return false
  const ariaDisabled = btn.getAttribute('aria-disabled')
  if (ariaDisabled === 'true') return false
  return !btn.classList.contains('ant-tabs-nav-btn-disabled')
}

function updateOverflowState() {
  const wrap = navWrapRef.value
  const list = navListRef.value

  if (!wrap || !list) {
    isOverflowing.value = false
    canScrollPrev.value = false
    canScrollNext.value = false
    return
  }

  isOverflowing.value = list.scrollWidth > wrap.clientWidth + 1
  canScrollPrev.value = isButtonEnabled(prevBtnRef.value)
  canScrollNext.value = isButtonEnabled(nextBtnRef.value)
}

function attachResizeObserver() {
  if (!canUseDom || typeof ResizeObserver === 'undefined') return

  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }

  const wrap = navWrapRef.value
  const list = navListRef.value

  if (!wrap) return

  resizeObserver = new ResizeObserver(() => scheduleOverflowSync())
  resizeObserver.observe(wrap)
  if (list) resizeObserver.observe(list)
}

const refreshNavMetrics = async () => {
  if (!canUseDom) return
  await nextTick()
  resolveNavDom()
  updateOverflowState()
  attachResizeObserver()
}

function scrollTabs(target: 'prev' | 'next') {
  const btn = target === 'prev' ? prevBtnRef.value : nextBtnRef.value
  if (!btn || !isButtonEnabled(btn)) return

  // Synthesize the default arrow click so rc-tabs keeps its own offsets in sync.
  btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
  btn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
  btn.click()

  scheduleOverflowSync()
}

const handleWheel = (evt: WheelEvent) => {
  if (!showScrollControls.value) return
  const primaryDelta = Math.abs(evt.deltaX) > Math.abs(evt.deltaY) ? evt.deltaX : evt.deltaY
  if (primaryDelta === 0) return

  evt.preventDefault()
  scrollTabs(primaryDelta > 0 ? 'next' : 'prev')
}

const cleanupWheelListener = (el?: HTMLElement | null) => {
  if (!el) return
  el.removeEventListener('wheel', handleWheel, wheelOptions)
}

const handleTabScroll = (evt: { direction: 'left' | 'right' | 'top' | 'bottom' }) => {
  updateOverflowState()
  emit('tabScroll', evt)
}

const handleScrollButton = (target: 'prev' | 'next') => {
  scrollTabs(target)
}

onMounted(() => {
  refreshNavMetrics()
  if (canUseDom) window.addEventListener('resize', refreshNavMetrics)
})

onUpdated(() => {
  refreshNavMetrics()
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (canUseDom) window.removeEventListener('resize', refreshNavMetrics)
  cleanupWheelListener(navWrapRef.value)
  if (rafId !== null) window.cancelAnimationFrame(rafId)
})

watch(
  () => navWrapRef.value,
  (el, prev) => {
    cleanupWheelListener(prev)
    if (el && canUseDom) el.addEventListener('wheel', handleWheel, wheelOptions)
  },
)
</script>

<template>
  <div
    :class="[
      $style.smartTabs,
      showScrollControls ? $style.scrollable : '',
      isHorizontal ? $style.horizontal : $style.vertical,
    ]"
  >
    <button
      v-if="showScrollControls"
      type="button"
      :class="[$style.scrollControl, $style.prevControl]"
      :disabled="!canScrollPrev"
      aria-label="向左滚动标签"
      @click="handleScrollButton('prev')"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9.78 4.22a.75.75 0 0 0-1.06 0L4.94 8l3.78 3.78a.75.75 0 0 0 1.06-1.06L7.06 8l2.72-2.72a.75.75 0 0 0 0-1.06Z"
          fill="currentColor"
        />
      </svg>
    </button>

    <button
      v-if="showScrollControls"
      type="button"
      :class="[$style.scrollControl, $style.nextControl]"
      :disabled="!canScrollNext"
      aria-label="向右滚动标签"
      @click="handleScrollButton('next')"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9.78 4.22a.75.75 0 0 0-1.06 0L4.94 8l3.78 3.78a.75.75 0 0 0 1.06-1.06L7.06 8l2.72-2.72a.75.75 0 0 0 0-1.06Z"
          fill="currentColor"
        />
      </svg>
    </button>

    <a-tabs
      ref="tabsRef"
      v-bind="props"
      v-bind="attrs"
      v-model:active-key="activeKey"
      :class="$style.smartTabsInner"
      @change="onChange"
      @tab-click="onTabClick"
      @tab-scroll="handleTabScroll"
      @edit="onEdit"
    >
      <!--  默认插槽：直接放 a-tab-pane 或业务自定义 pane  -->
      <slot />

      <!--  自定义 tabBar 插槽  -->
      <template
        v-if="$slots.renderTabBar"
        #renderTabBar="scope"
      >
        <slot
          name="renderTabBar"
          v-bind="scope"
        />
      </template>

      <!--  左右附加内容插槽  -->
      <template
        v-if="$slots.tabBarExtraContent"
        #tabBarExtraContent
      >
        <slot name="tabBarExtraContent" />
      </template>

      <!--  tab bar 上左侧额外的元素  -->
      <template
        v-if="$slots.leftExtra"
        #leftExtra
      >
        <slot name="leftExtra" />
      </template>

      <!-- tab bar 上右侧额外的元素 -->
      <template
        v-if="$slots.rightExtra"
        #rightExtra
      >
        <slot name="rightExtra" />
      </template>

      <!-- 自定义添加按钮 -->
      <template
        v-if="$slots.addIcon"
        #addIcon
      >
        <slot name="addIcon" />
      </template>

      <!-- 自定义折叠icon -->
      <template
        v-if="$slots.moreIcon"
        #moreIcon
      >
        <slot name="moreIcon" />
      </template>
    </a-tabs>
  </div>
</template>

<style module>
.smartTabs {
  position: relative;
}

.smartTabsInner {
  width: 100%;
}

.scrollable :global(.ant-tabs-nav) {
  margin: 0 32px;
}

.scrollControl {
  position: absolute;
  top: 18px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #e5e6eb;
  background: rgba(255, 255, 255, 0.9);
  color: #4e5969;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.scrollControl svg {
  width: 14px;
  height: 14px;
}

.scrollControl:disabled {
  cursor: not-allowed;
  opacity: 0.35;
  box-shadow: none;
}

.scrollControl:not(:disabled):hover {
  color: #165dff;
  border-color: #165dff;
}

.prevControl {
  left: 4px;
}

.nextControl {
  right: 4px;
  transform: rotate(180deg);
}

.vertical .scrollControl {
  left: 18px;
  right: auto;
  transform: none;
}

.vertical .prevControl {
  top: 8px;
}

.vertical .nextControl {
  top: auto;
  bottom: 8px;
}

.vertical.scrollable :global(.ant-tabs-nav) {
  margin: 32px 0;
}

.vertical .nextControl svg {
  transform: rotate(90deg);
}

.vertical .prevControl svg {
  transform: rotate(-90deg);
}

.horizontal .prevControl svg {
  transform: rotate(0);
}

.horizontal .nextControl svg {
  transform: rotate(180deg);
}

.smartTabs
  :global(.ant-tabs-nav-operations) {
  display: none;
}

.smartTabs
  :global(.ant-tabs-tab) {
  border: none !important;
  background: none !important;
}

.smartTabs
  :global(.ant-tabs-tab-active) {
  color: #165dff !important;
}

.smartTabs
  :global(.ant-tabs-ink-bar) {
  background: #165dff !important;
}

.smartTabs
  :global(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active) {
  border-color: transparent !important;
  background: none !important;
}

.smartTabs
  :global(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab) {
  border: none !important;
  background: none !important;
}

.smartTabs
  :global(.ant-tabs-card.ant-tabs-editable-card .ant-tabs-nav-add) {
  border: 1px dashed #c9ced6;
  background: none;
  transition: all 0.2s ease;
}

.smartTabs
  :global(.ant-tabs-card.ant-tabs-editable-card .ant-tabs-nav-add:hover) {
  color: #165dff;
  border-color: #165dff;
}
</style>
