const loginForm = document.querySelector(".login-form")
const loginPage = document.querySelector(".login-page")
//var questionnairesList = 
loginForm.addEventListener('submit', loginFormHandler)

function setLoggedUserName() {
    let loggedUserName = document.getElementById("loggedUserName")
    let currUser = sessionStorage.getItem("loggedUser")
    loggedUserName.innerText = currUser
    let splitter = document.createElement("span")
    splitter.setAttribute("class", "inline-block ml-4")
    splitter.innerText = '|'
    loggedUserName.append(splitter)
}

function restorePassword()
{
    alert('Абабыбв')
    //TODO написать появление модального окна
}

function getQuestionnairesByUserId () 
{
    userId = sessionStorage.getItem("loggedUserId")

    fetch('http://localhost:8000/get_questionnaires?' + new URLSearchParams({user_id: userId}), {
    method: 'GET',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Origin": 'http://localhost:5500'
    }
})
    .then(response => response.json())
    //.then(response => console.log((response.json())))
    .then(function(response){
        var questionnairesList = response
        console.log(typeof(questionnairesList) + " Aaaa")
        createQuestionnairesCards(questionnairesList);
        //console.log(questionnairesList["questionnaires"].length)
    })
    //console.log(jsonData)
    // .then(function(response){
    //     if (response["result"] == "fail"){
    //         let error_message = document.createElement('p')
    //         error_message.style.cssText = 'color:#DC143C'
    //         error_message.setAttribute("id", "error")
    //         error_message.innerText = response["error"]
    //         loginForm.append(error_message)
    //     }
    //     else if (response.hasOwnProperty("full_name")){
    //         loginPage.style.display = "none"
    //         sessionStorage.setItem("loggedUser", response["full_name"])
    //         sessionStorage.setItem("loggedUserId", response["id"])
    //         window.location.href = "main-page.html"
    //     }})
    
}

function createQuestionnairesCards(questionnairesList){
    // console.log(questionnairesList)
//     let questionnaires = {"questionnaires":[{"id":"12345", "title": "Опрос №1", "body": "Очень важно?", "respondents": ["Виталик", "Андрей"]}, 
// {"id":"23456", "title": "Опрос №2", "body": "Не очень важно?", "respondents": ["Антон", "Сергей", "Андрей", "Андрей", "Андрей", "Андрей", "Андрей", "Андрей", "Андрей", "Андрей", "Андрей", "Андрей"]}]}
    questionnairesDiv = document.getElementById("questionnaires")
    for (let i = 0; i < questionnairesList["questionnaires"].length; i++) {
        if (questionnairesList["questionnaires"][i]["status"] == "active") {
            let card = document.createElement('div')
            card.setAttribute("class", "card-item mb-2 mx-auto")
            card.setAttribute("questionnaire_id", questionnairesList["questionnaires"][i]["id"])
            let questionnaireTitle = document.createElement('p')
            questionnaireTitle.setAttribute("class", "bold")
            questionnaireTitle.innerText = questionnairesList["questionnaires"][i]["title"]
            card.append(questionnaireTitle)
            let questionnaireBody = document.createElement('p')
            questionnaireBody.innerText = questionnairesList["questionnaires"][i]["body"]
            card.append(questionnaireBody)
            let respondents = document.createElement('ul')
            respondents.setAttribute("class", "inline-flex w-full mx-auto flex-wrap justify-start")
        // for (let j = 0; j < questionnairesList["questionnaires"][i]["respondents"].length; j++) {
        //     let respondent = document.createElement('li')
        //     respondent.setAttribute("style", "display: block;")
        //     respondent.innerText = questionnairesList["questionnaires"][i]["respondents"][j]
        //     respondents.append(respondent)
        // }
            card.append(respondents)
            let testIt = document.createElement("button")
            testIt.setAttribute("class", "w-40 ml-30 bold")
            testIt.setAttribute("onclick", "alert(parentElement.getAttribute('questionnaire_id'))")
        // TODO переход на страницу анкеты по нажатию кнопки Пройти опрос
            testIt.innerText = "Пройти опрос"
            card.append(testIt)
            questionnairesDiv.append(card)
        }
    }
}

function createAnswersCards(){
    let answers = {"answers":[{"id":"12345", "title": "Опрос №1", "body": "Кто лох?"}, 
{"id":"23456", "title": "Опрос №2", "body": "Кто не лох?"}]}
answersDiv = document.getElementById("answers")
    for (let i = 0; i < answers["answers"].length; i++) {
        let card = document.createElement('div')
        card.setAttribute("class", "card-item mb-3")
        let questionnaireTitle = document.createElement('p')
        questionnaireTitle.setAttribute("class", "bold")
        questionnaireTitle.innerText = answers["answers"][i]["title"]
        card.append(questionnaireTitle)
        let questionnaireBody = document.createElement('p')
        questionnaireBody.innerText = answers["answers"][i]["body"]
        card.append(questionnaireBody)
        let testIt = document.createElement("button")
        testIt.setAttribute("class", "w-40 ml-30 bold")
        testIt.innerText = "Посмотреть результаты"
        card.append(testIt)
        answersDiv.append(card)
    }
}

document.getElementById("loggedUserName").innerText = currentUserName

function loginFormHandler(event) {
    event.preventDefault()
    if (document.getElementById("error")){
        document.getElementById("error").remove()
    }
    var login_1 = document.getElementById("email").value
    var password_1 = document.getElementById("password").value
    fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Origin": 'http://localhost:5500'
    },
    body: JSON.stringify({ "email": login_1, "password": password_1 })
})
    .then(response => response.json())
    //.then(response => console.log(JSON.stringify(response)))
    //console.log(jsonData)
    .then(function(response){
        if (response["result"] == "fail"){
            let error_message = document.createElement('p')
            error_message.style.cssText = 'color:#DC143C'
            error_message.setAttribute("id", "error")
            error_message.innerText = response["error"]
            loginForm.append(error_message)
        }
        else if (response.hasOwnProperty("full_name")){
            loginPage.style.display = "none"
            sessionStorage.setItem("loggedUser", response["full_name"])
            sessionStorage.setItem("loggedUserId", response["id"])
            window.location.href = "main-page.html"
        }})
    //var jsonData = response.JSON()
   //.then(response => response.json())
}



function drawChart() {
    Highcharts.chart('spider-chart', {
        colors: ['#f78200', '#90ee7e'],
         chart: {
             polar: true,
             type: 'area',
             plotBorderColor: '#f78200',
             plotBackgroundColor: '#FFFFFF'
         },
     
         credits: {
             enabled: false
         },
     
         title: {
             text: 'График оценок',
             x: -80
         },
     
         pane: {
             size: '80%',
             plotBackgroundColor: '#3d4d5d'
         },
     
         xAxis: {
             categories: ['Агрессивность', 'Эмпатия', 'Коммуникабельность', 'Харды', 'Богатство', 'Красота', 'Вкус'],
             tickmarkPlacement: 'on',
             lineWidth: 0,
             gridLineColor: '#263542',
         },
     
         yAxis: {
             gridLineInterpolation: 'polygon',
             lineWidth: 0,
             min: 0,
             labels: {
                 enabled: false
                 // formatter: function() {
                 //     return this.value + '%';
                 // }
             },
             gridLineColor: '#263542',
         },
     
         tooltip: {
             shared: true,
             pointFormat: '<span style="color:{series.color}"><strong>{point.y:.2f}%</strong><br/>'
         },
     
         legend: {
             align: 'right',
             verticalAlign: 'top',
             y: 70,
             layout: 'vertical',
             enabled: true
         },
     
         series: [{
             name: 'Оценки',
             data: [22.2, 10.4, 3.8, 5.6, 2.2, 4.7, 7.1],
             pointPlacement: 'on',
             fillColor: 'rgba(247, 130, 0, 0.2)'
         }, {
            name: 'Мои оценки',
             data: [12.2, 20.4, 6.8, 10.6, 4.2, 8.7, 14.1],
             pointPlacement: 'on',
             fillColor: 'rgba(247, 130, 0, 0.2)'
         }]
     });
     
     // Month slider bar
     var timePoints = ['Apr 16', 'May 16', 'Jun 16', 'Jul 16', 'Aug 16', 'Sep 16', 'Oct 16', 'Nov 16', 'Dec 16', 'Jan 17', 'Feb 17', 'Mar 17', 'Apr 17', 'May 17', 'Jun 17', 'Jul 17', 'Aug 17', 'Sep 17']
     $("#timeline").slider({
       orientation: "vertical",
       min: 0,
       max: timePoints.length - 1,
       step: 1,
       slide: function(event, ui) {
         $(".time-point").text(timePoints[ui.value]);
       }
     });
}