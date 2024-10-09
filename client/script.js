async function login(event){
    event.preventDefault();

    let email = document.getElementById('email').value

    let password = document.getElementById('password').value


    let data ={
        email,
        password
    }

   let strdata = JSON.stringify(data);
   console.log("strdata",strdata);
   
   try {
    let response = await fetch('/login',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : strdata
    });
    console.log('response',response);

    let parsed_Response = await response.json();
    console.log('parsed_Response : ',parsed_Response);

    let token_data = parsed_Response.data
    console.log("token_data : ",token_data);

    let user_type = token_data.user_type.user_type;

    let token = token_data.token;

    let id =token_data.id;
    console.log("id",id)

    let token_key = id;
    
    
    localStorage.setItem(token_key, token);
    console.log("token_key",token_key)



    if(user_type ==='Admin'){

        window.location =`admin.html?login=${token_key}`
    }
    else if(user_type === "employee"){
        window.location = `view.html?login=${token_key}&id=${id}`
    }



   } catch (error) {
    console.log("error",error);
   }
 
}

function add(){

    let params = new URLSearchParams(window.location.search);

    let token_key = params.get('login');

    window.location = `adduser.html?login=${token_key}`
}

async function addEmployee(event){
    event.preventDefault()
    console.log("reached......");

    let params = new URLSearchParams(window.location.search);
    console.log('params',params);

    let token_key = params.get('login');
    console.log("token_key",token_key);

    let token = localStorage.getItem(token_key);


    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phoneno = document.getElementById('phoneno').value;
    let password = document.getElementById('password').value;
    let usertype = document.getElementById('usertype').value;

    let data = {
        name,
        email,
        phoneno,
        password,
        usertype
    }

    let strdata = JSON.stringify(data);

    try {
    
        let response = await fetch('/user',{
            method : 'POST',
            headers : {
                "Content-Type" : "Application/json",
                'Authorization' : `Bearer ${token}`
            },
            body : strdata,

        });
        console.log("response",response);

        if(response.status === 200){
            alert('Employee successfully added ');
            window.location=`admin.html?login=${token_key}`
        }else{
            alert('somthing went worg')
        }

         
        

    } catch (error) {
        console.log("error",error)
    }
}

async function veiwUsers(){
    let params = new URLSearchParams(window.location.search);
    console.log('params',params);

    let token_key = params.get('login');
    console.log("token_key",token_key);

    let token = localStorage.getItem(token_key)

    try {
        let response = await fetch(`/user`,{
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });

        let parsed_Response = await response.json();
        console.log("parsed_Response",parsed_Response);

        let data = parsed_Response.data;
        console.log("data",data)

        const tableBody = document.getElementById('userTable');
        let row='';
        for(let i=0; i<data.length ; i++){

        
            row += `
                <tr>
                    <td class="hov"><i class='fas fa-user-alt' style='font-size:36px'></i></td>
                    <td class="hov">${data[i]._id}</td>
                    <td class="hov">${data[i].name}</td>
                    <td class="hov">${data[i].email}</td>
                    <td class="hov">${data[i].phoneno}</td>
                    <td><button class="custom-btn btn-16" onclick="singleData('${data[i]._id}')" >view</button></td>
                    <td><i class="fa fa-pencil-square-o"  onclick="updateData('${data[i]._id}')" style="font-size:30px" ></i></td>
                    <td><i class="fa fa-trash" onclick="deleteData('${data[i]._id}')" style='font-size:30px;color:red'></i></td>
                </tr>
            `;

            // tableBody.appendChild(row);
            tableBody.innerHTML =row;

        }
        

    } catch (error) {
        console.log("error",error);
    }
    
}

function singleData(id){
    let params = new URLSearchParams(window.location.search);
    console.log('params',params);

    let token_key = params.get('login');
    console.log("token_key",token_key);

    let token = localStorage.getItem(token_key)
    window.location =`employee.html?login=${token_key}&id=${id}`
}

async function loadUserDatas() {

    console.log("reached ...................");

    let params = new URLSearchParams(window.location.search);

    let id = params.get('id');
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);

    try {
        let response = await fetch(`/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "Application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let parsed_Response = await response.json();
        console.log("parsed_Response", parsed_Response);

        let data = parsed_Response.data;
        console.log("data", data);

        let singleViewData = document.getElementById('singleViewData');

        // Use fallback values if data fields are undefined or null
        // let email = data.email 
        // let name = data.name

        let single = `
            <div> ${data.email}</div>
            <div> ${data.name}</div>
            <div>${data.phoneno}</div>
        `;

        singleViewData.innerHTML = single;

    } catch (error) {
        console.log("Error:", error);
        document.getElementById('singleViewData').innerHTML = `<div>Error loading data</div>`;
    }
}

async function viewData(){

    
    console.log("reached ...................");

    let params = new URLSearchParams(window.location.search);

    let id = params.get('id');

    let  token_key = params.get('login');

    let token = localStorage.getItem(token_key)

    try {
       
        let response = await fetch(`/users/${id}`,{
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
   
        })

        console.log("response",response);
        
        let parsed_Response = await response.json();
        console.log("parsed_Response",parsed_Response);


        let data = parsed_Response.data;
        console.log("data",data)

    } catch (error) {
        console.log("error",error)
    }

}

function updateData(id){
    let params = new URLSearchParams(window.location.search);
    console.log('params',params);

    let token_key = params.get('login');
    console.log("token_key",token_key);

    let token = localStorage.getItem(token_key)
    window.location =`update.html?login=${token_key}&id=${id}`

}

async function updateLoadDatas() {
    let params = new URLSearchParams(window.location.search);

    let id = params.get('id');

    let  token_key = params.get('login');

    let token = localStorage.getItem(token_key)


    try {
        let response = await fetch(`/users/${id}`,{
            method : 'GET',
             headers : {
                'Authorization' : `Bearer ${token}`,
                "Content-Type" : "Application/json",
            }
        });
        console.log("response : ",response);

        let parsed_Response = await response.json();
        console.log("parsed_Response : ",parsed_Response);
        
        let data = parsed_Response.data;
        console.log("data",data)

        let name = document.getElementById('name');
        name.value = data.name;

        
        let email = document.getElementById('email');
        email.value = data.email;

        let phoneno = document.getElementById('phoneno');
        phoneno.value = data.phoneno;

        let password = document.getElementById('password');
        password.value = data.password;

        // let usertype = document.getElementById('usertype');
        // usertype.value = data.usertype;
        
    } catch (error) {
        console.log("error : ",error)
    }

    
}

async function editData(event){
    event.preventDefault()
    
    let params = new URLSearchParams(window.location.search);
    console.log('params',params);

    let id = params.get('id');

    let token_key = params.get('login');
    console.log("token_key",token_key);

    let token = localStorage.getItem(token_key);

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phoneno = document.getElementById('phoneno').value;
    let password = document.getElementById('password').value;
    let usertype = document.getElementById('usertype').value;

    let data = {
        name,
        email,
        phoneno,
        password,
        usertype
    }

    let strdata = JSON.stringify(data);

    try {
        
        let response = await fetch(`/singleUpdate/${id}`,{
            method : 'PUT',
            headers : {
                "Content-Type" : "Application/json",
                'Authorization' : `Bearer ${token}`
            },
            body : strdata,
        });
        console.log("responce :",response);

        let parsed_response = await response.json();
        console.log('parsed_response', parsed_response);


        if(response.status===200){
            alert('Employee successfully Updated..');
            window.location=`admin.html?login=${token_key}`
        }else{
            alert('Updation Failed')
        }



    } catch (error) {
        console.log("error",error);
    }

}

async function deleteData(id) {
    let params = new URLSearchParams(window.location.search)
    let token_key = params.get('login');
    let token = localStorage.getItem(token_key);

    console.log("reached......")

    try {
        let response = await fetch(`/userDelete/${id}`,{
            method : 'DELETE',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        console.log("response :",response)

        if(response.status===200){
            alert("Employee successfully deleted ");
            window.location=`admin.html?login=${token_key}`

        }else{
            alert("Something went wrong ");
        }
    } catch (error) {
        console.log("error",error);
    }

}