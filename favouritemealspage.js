(function (){
    console.log("working");
    // web element 
    const favDom =document.getElementById("dishes-container");

    let favList=localStorage.getItem("favList");
    favList=JSON.parse(favList); // this is any array of array e.g [[{}],[{}]]
    // console.log(favList);  
    if(favList.length === 0 ){
        console.log(favList);
        favDom.innerHTML ='';
        const divimg =document.createElement('div');
        divimg.innerHTML=`<div > 
                                <img src= "noitem.png"
                                alt=""  >
                                
                        </div>
                        <div  style="display: flex;">  
                        <span >NO Items are presents !!</span> 
                        </div>`;    
        
        favDom.append(divimg); 
        return;
    }

    let Dishdetail=[]; 

    function addToMealDetailDOM(dish1){
        let heartId="heart-checked" ; 
        const divimg =document.createElement('div');

        divimg.innerHTML=`<div ><a href="mealDetailPage.html" > <!-- href="mealDetailPage.html" -->
                                <img src=${dish1.strMealThumb}
                                alt="" id="srcimg" data-id="${dish1.idMeal}">
                                </a>
                            </div>
                            <div  style="display: flex;"> 
                                <div style="font-size: x-large; margin: auto 5px;">  <i class="fa-solid fa-heart" id="${heartId}" data-id="${dish1.idMeal}"></i></div>
                                <span >${dish1.strMeal}</span> 
                            </div>`;  
        
        favDom.append(divimg); 
        return;

    }
    function addmealsToDOM(favList){
        favDom.innerHTML ='';
        for(let i of favList){
            // console.log(i[0]);
            addToMealDetailDOM(i[0]);
        }
        return;
    }

    function removeFav(taaskID){ 
        favList=favList.filter((dish)=>{
            return dish[0].idMeal!=taaskID;
        }  );
        // console.log(favList.length);
        // render ot DOM
        addmealsToDOM(favList); 
        // add favlist function
        const favList1=JSON.stringify(favList);
        localStorage.setItem("favList",favList1);
        return;
    }

    function handleClick(e){
        const target=e.target;
        if(target.id==='heart' || target.id === 'heart-checked'){
            const taaskID=target.dataset.id;
            // console.log("clicked");
            if(confirm("Are u sure u wannt to delete ?")){
                removeFav(taaskID);
            }
        }else if(target.id==="srcimg"){
            const taaskID=target.dataset.id;
            // console.log(favList); 
            Dishdetail = favList.filter((dish)=>{
                return (dish[0].idMeal === taaskID);
            } );
            console.log(Dishdetail[0] );
            let x=JSON.stringify(Dishdetail[0]); 
            localStorage.setItem("Dishdetail",x);
            return;
        }
    }


    addmealsToDOM(favList);
    // Event delegation 
    function appInitilize(){
        // Add event listener  
        
        document.addEventListener('click',handleClick);
    } 
    appInitilize();

})();