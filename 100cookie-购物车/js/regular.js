onload=function(){
            var error_name = false;
            var error_password = false;
            var error_phone = false;
            var error_email = false;
            var error_check = false;
            var error_address = false;
            var error_post =false;

            var inputs = getElementsByClassName("form-control");
            var btns = getElementsByClassName("btn");
            
            inputs[0].addEventListener('blur',checkUserName);
            // inputs[1].addEventListener('blur',checkP);
            inputs[1].addEventListener("keyup",checkPassword);
            inputs[2].addEventListener('blur',checkeMail);
            inputs[3].addEventListener('blur',checkPhone);
            inputs[5].addEventListener("blur",checkAddr);
            inputs[6].addEventListener("blur",checkPost);
                
            function checkUserName(){
                var reg = /^[a-zA-Z0-9_]{5,15}$/;
                var val = inputs[0].value;
                if(val== ''){
                    inputs[0].placeholder = "用户名不能为空！";
                    error_name = true;
                    inputs[0].style.borderColor = 'red';
                    return;
                }
                if(reg.test(val)){
                    inputs[0].style.borderColor = '#ccc';

                    error_name = false;
                }else
                    {
                        inputs[0].value='';
                        inputs[0].placeholder = "用户名是5到15个英文或数字，还可包含“_”";
                        error_name = true;
                        inputs[0].style.borderColor = 'red';

                    }

            }


            function checkPassword(){
                var reg1=/\w+/;
                var reg = /^([\@\!\#\$\%\^\&\*\.\~]+){6,22}?$/;
                var val = inputs[1].value;
                if(val== ''){
                    inputs[1].placeholder = "密码不能为空！";
                    error_password = true;
                    inputs[1].style.borderColor = 'red';
                    return;
                }
               
                if(/^((\d+)|[a-zZ-a]){6,12}?/.test(val)==true){
                    btns[1].style.backgroundColor = "green";
                    btns[1].style.borderColor = "green";
                    inputs[1].style.borderColor = '#ccc';
                    error_password = false;
                }
                if(/^(?!([a-zA-Z]+|\d+)$){6,12}/.test(val)){
                    btns[1].style.backgroundColor = "green";
                    btns[1].style.borderColor = "green";
                    btns[2].style.backgroundColor = "orange";
                    btns[2].style.border = "orange";
                    inputs[1].style.borderColor = '#ccc';
                    error_password = false;

                }
                if(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d\@\#\$\%\^\&\*]{12,20}$/.test(val)){
                    btns[1].style.backgroundColor = "green";
                    btns[1].style.borderColor = "green";
                    btns[2].style.backgroundColor = "orange";
                    btns[2].style.border = "orange";
                    btns[3].style.backgroundColor = "red";
                    btns[3].style.borderColor = "red";
                    inputs[1].style.borderColor = '#ccc';
                    error_password = false;
                }
            }
            

            function checkeMail(){
                var reg = /(\w+)@(163|126|gmail|qq)\.(com|cn|net)$/;
                var val = inputs[2].value;
                if(val == ""){
                    inputs[2].placeholder = "邮箱不能为空！";
                    error_email = true;
                    inputs[2].style.borderColor = "red";
                    return;
                }

                if(reg.test(val)){
                    inputs[2].style.borderColor = "#ccc";
                    error_email = false;
                }else{
                    inputs[2].value = "";
                    inputs[2].placeholder = "您输入的邮箱格式有误！";
                    error_email = true;
                    inputs[2].style.borderColor = "red";

                }
            }

            function checkPhone(){
                var reg = /1[35578]\d{9}/;
                var val = inputs[3].value;
                console.log(val)
                if(val== ''){
                    inputs[3].placeholder = "电话号码不能为空！";
                    inputs[3].style.borderColor = "red";
                    error_phone = true;
                    return;
                }
                if(reg.test(val)){
                    inputs[3].style.borderColor = "#ccc";
                    error_phone = false;

                }else{
                    inputs[3].value='';
                    inputs[3].placeholder = "请输入正确的手机号码！";
                    inputs[3].style.borderColor = "red";
                    error_phone = true;
                }
            }

            function checkAddr(){
                var val = inputs[5].value;
                if( /^[\u2E80-\u9FFF]+$/.test(val)){
                    inputs[5].style.borderColor = "#ccc";
                    error_address = false;
                }
                else{
                    inputs[5].value = "";
                    inputs[5].style.borderColor = "red";
                    inputs[5].placeholder = "请输入正确地址！";
                }
            }

            function checkPost(){
                var val = inputs[6].value;
                if(/^[1-9]\d{5}/.test(val)){
                    inputs[6].style.borderColor = "#ccc";
                    error_post =false;
                }else{
                    inputs[6].value = "";
                    inputs[6].placeholder = "请输入正确的邮政编码！";
                    inputs[6].style.borderColor = "red";
                    error_post =true;

                }
            }
            
        }