		onload=function(){
			let box = document.getElementById("box");
			let points = document.getElementById("lu").children;
			let oUl = box.children[0];
			let list = oUl.children;
			let timer;
			let index = 0;
			timer = setInterval(autoplay,3000);
			box.addEventListener("mouseover",function(){
				clearInterval(timer);
			})
			box.addEventListener("mouseout",function(){
				timer = setInterval(autoplay,3000);
			})

			for(let j=0;j<points.length;j++){
				points[j].addEventListener("click",function(){
					animate(oUl,{left:-352*j});
					for(let i=0;i<points.length;i++){
						points[i].className="";
					}
					points[j].className = "active";
				})
			}

			function autoplay(){
				move()
				for(let i=0;i<points.length;i++){
					points[i].className="";
				}
				points[index==4?0:index].className = "active";
			}

			function move(){
				if(++index == 5){
					oUl.style.left = 0;
					index=1;
				}
				animate(oUl,{left:-352*index});
			}
		}

