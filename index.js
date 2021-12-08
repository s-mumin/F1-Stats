//hamburger menu
const burgerIcon = document.querySelector("#burger")
const navbarMenu = document.querySelector("#nav-links")

burgerIcon.addEventListener("click", () =>{
    navbarMenu.classList.toggle("is-active")
})

//================================Current===========================================================
// Driver Standings
const driversStandings = async () => {
    try{
        const res = await axios.get("http://ergast.com/api/f1/current/driverStandings.json")
        const standings = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings

        for(var standing of standings){
            // console.log(`${standing.Driver.code}: ${standing.points} - ${standing.Constructors[0].name}`)
            
            // driver table
            const driverTable = document.querySelector("#driverTable")

            //create table row  - then append into table
            const driverTableRow = document.createElement("tr")

            //put tr into table
            driverTable.append(driverTableRow)

            //create td and put into tr
            const driverTableDataPos = document.createElement('td')
            const driverTableDataDriver = document.createElement('td')
            const driverTableDataPoints = document.createElement('td')
            const driverTableDataTeam = document.createElement('td')

            driverTableDataPos.innerHTML = `${standing.position}`
            driverTableRow.append(driverTableDataPos)

            driverTableDataDriver.innerHTML = `${standing.Driver.code}`
            driverTableRow.append(driverTableDataDriver)

            driverTableDataPoints.innerHTML = `${standing.points}`
            driverTableRow.append(driverTableDataPoints)

            driverTableDataTeam.innerHTML = `${standing.Constructors[0].name}`
            driverTableRow.append(driverTableDataTeam)

        }       
    }
    catch(e){
        console.log("current standings not available!", e)
        driverTableRow.append("current standings not available!")
    }
}
driversStandings()


const lastResult = async () => {
    try{
        const res = await axios.get("http://ergast.com/api/f1/current/last/results.json")
        const lastName = res.data.MRData.RaceTable.Races[0].Results[0].Driver.familyName
        const firstName = res.data.MRData.RaceTable.Races[0].Results[0].Driver.givenName
        const round = res.data.MRData.RaceTable.Races[0].round
        const raceName = res.data.MRData.RaceTable.Races[0].raceName
        const circuit = res.data.MRData.RaceTable.Races[0].Circuit.circuitName

        const raceSeason = res.data.MRData.RaceTable.season

        // console.log(`${firstName} ${lastName}`)
        const lastWinner = document.querySelector("#lastWinner")
        lastWinner.append(`${firstName} ${lastName}`)

        const roundNum = document.querySelector("#lastRound")
        roundNum.append(`${round}`)

        const lastRace = document.querySelector("#lastRace")
        lastRace.append(`${raceName}`)

        const circuitName = document.querySelector("#lastCircuit")
        circuitName.append(`${circuit}`)

        const winnerPic = document.querySelector("#lastWinnerPic")
        winnerPic.src = `images/${lastName}.jpg`

    }
    catch(e){
        console.log("last results not available")
    }
}
lastResult()

//Constructor Standings
const constructorsStandings = async () => {

    try{
        const res = await axios.get("http://ergast.com/api/f1/current/constructorStandings.json")
        // console.log(res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
        const constStandings = res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        
        for(var constStanding of constStandings){
            // console.log(`${constStanding.position}: ${constStanding.Constructor.name}: ${constStanding.points}`)

            const constructorTable = document.querySelector("#constructorTable")
            
            const constTableRow = document.createElement("tr")
            
            constructorTable.append(constTableRow)

            const tableDataPos = document.createElement("td")
            const tableDataTeam = document.createElement("td")
            const tableDataPoints = document.createElement("td")
            

            tableDataPos.innerHTML = (`${constStanding.position}`)
            constTableRow.append(tableDataPos)

            tableDataTeam.innerHTML = (`${constStanding.Constructor.name}`)
            constTableRow.append(tableDataTeam)

            tableDataPoints.innerHTML = (`${constStanding.points}`)
            constTableRow.append(tableDataPoints)
        }

    }   

    catch(e){
        console.log("constructors standings not available")
    }

}
constructorsStandings()

// fastest lap
const lastFastest = async () => {
    try{
        const res = await axios.get("http://ergast.com/api/f1/current/last/fastest/1/results.json")
        // console.log(res.data.MRData.Race)
        // console.log(res.data.MRData)
        // console.log(res.data.MRData.RaceTable.round)

        const lastDriver = res.data.MRData.RaceTable.Races[0].Results[0].Driver.familyName
        const lastTime = res.data.MRData.RaceTable.Races[0].Results[0].FastestLap.Time.time
        const lastLap = res.data.MRData.RaceTable.Races[0].Results[0].FastestLap.lap
        
        const lastFastestDriver = document.querySelector("#lastFastestDriver")
        lastFastestDriver.append(`${lastDriver}`)

        const lastFastestTime = document.querySelector("#lastFastestTime")
        lastFastestTime.append(`${lastTime}`)

        const lastFastestLap = document.querySelector("#lastFastestLap")
        lastFastestLap.append(`${lastLap}`)

        const lastFastestPic = document.querySelector("#lastFastestPic")
        lastFastestPic.src = `images/${lastDriver}.jpg`

    }
    catch(e){
        console.log("kjasfjsanafs", e)
    }
}
lastFastest()

const pitStop = async () => {
    try{
        const res = await axios.get("http://ergast.com/api/f1/current/last/pitstops.json")

        const stops = res.data.MRData.RaceTable.Races[0].PitStops
        const stopsArray = []

            for(var stop of stops){
                if(stop.duration <= 59)
                stopsArray.push(stop.duration)
            }

            const x = Math.min.apply(Math, stopsArray)

            for(var eachStop of stops){
                if(eachStop.duration == x){

                    const resp = await axios.get("http://ergast.com/api/f1/current/last/results.json")
            
                    const lastRes = resp.data.MRData.RaceTable.Races[0].Results
                    

                            for(var lastR of lastRes){
                                if(eachStop.driverId ==lastR.Driver.driverId ){
                                    const pitDriverName = `${lastR.Driver.givenName} ${lastR.Driver.familyName}`
                                    const fastestDriverTeam = document.querySelector("#fastestDriverTeam")
                                    fastestDriverTeam.append(lastR.Constructor.name)
                                    const fastestDriverStop = document.querySelector("#fastestDriverStop")
                                    fastestDriverStop.append(pitDriverName)
                                    const lastFastestPit = document.querySelector("#lastFastestPit")
                                    lastFastestPit.src = `images/${lastR.Constructor.name}.jpg`
                                }
                            }

                        const fastestDriverTime = document.querySelector("#fastestDriverTime")
                        fastestDriverTime.append(eachStop.duration)

                        const fastestDriverStopNum = document.querySelector("#fastestDriverStopNum")
                        fastestDriverStopNum.append(eachStop.stop)

                        const fastestDriverLap = document.querySelector("#fastestDriverLap")
                        fastestDriverLap.append(eachStop.lap)

                        

                }
            }

    }
    catch(e){
        console.log("dhsgfhdsfsj", e)
    }
}
pitStop()

//====================================HISTORICAL=============================================

// Drivers info
const driverSearchBtn = document.querySelector("#driverSearchSubmit")
const driverName = document.querySelector("#driverSearchName")

driverSearchBtn.addEventListener("click", (e) =>{
    driverInfo()
    e.preventDefault()
    

})

const driverInfo = async () => {
    try{
        const res = await axios.get(`http://ergast.com/api/f1/drivers/${driverName.value}.json`)

        const firstName = res.data.MRData.DriverTable.Drivers[0].givenName
        const lastName = res.data.MRData.DriverTable.Drivers[0].familyName
        const driverCode = res.data.MRData.DriverTable.Drivers[0].code
        const driverNumber = res.data.MRData.DriverTable.Drivers[0].permanentNumber
        const driverNationality = res.data.MRData.DriverTable.Drivers[0].nationality
        const driverDoB = res.data.MRData.DriverTable.Drivers[0].dateOfBirth

        const driverFullName = document.querySelector("#driverFullName")
        const fullName = `${firstName} ${lastName}`
        driverFullName.innerHTML = "Name: "
        driverFullName.append(`${fullName}`)

        const driverCodeName = document.querySelector("#driverCode")
        driverCodeName.innerHTML = "Code: "
        if(driverCode == undefined){
            driverCodeName.innerHTML = "Code: "
            driverCodeName.append(`${lastName} does not have a code`)
        }   else{
            driverCodeName.innerHTML = "Code: "
            driverCodeName.append(`${driverCode}`)
        }

        const driverNum = document.querySelector("#driverNumber")
        driverNum.innerHTML = "Number: "
        if(driverNumber == undefined){
            driverNum.innerHTML = "Number: "
            driverNum.append(`${lastName} did not have a permanent number`)
        }   else{
            driverNum.innerHTML = "Number: "
        driverNum.append(`${driverNumber}`)
        }
        
        const driverNation = document.querySelector("#driverNationality")
        driverNation.innerHTML = "Nationality: "
        driverNation.append(`${driverNationality}`)

        const driverDateofBirth = document.querySelector("#driverDoB")
        driverDateofBirth.innerHTML = "Date of Birth: "
        driverDateofBirth.append(`${driverDoB}`)  
    }
    catch(e){
        console.log("could not find driver", e)
    }
}

// drivers results in a year
const driverResultsName = document.querySelector("#driverResultsName")
const driverResultsYear = document.querySelector("#driverResultsYear")
const driverResultsBtn = document.querySelector("#driverNameAndYearSubmit")

driverResultsBtn.addEventListener("click", (e) => {

    while (raceResults.rows.length > 1) {
        raceResults.deleteRow(1);
      }

    driversResults()
    e.preventDefault()
} )

const driversResults = async () => {
    try{
        const res = await axios.get(`http://ergast.com/api/f1/${driverResultsYear.value}/drivers/${driverResultsName.value}/results.json`)
        // console.log(res.data.MRData)
        const races = res.data.MRData.RaceTable.Races

        for(var race of races){

            //create driver table
            const raceResultsTable = document.querySelector("#raceResults")

            //create table row  - then append into table
            const raceResultsTableRow = document.createElement("tr")
            raceResultsTable.append(raceResultsTableRow)

            const raceName = document.createElement("td")
            const raceRound = document.createElement("td")
            const gridPos = document.createElement("td")
            const finPos = document.createElement("td")


            raceRound.innerHTML = ""
            raceRound.innerHTML = `${race.round}`
            raceResultsTableRow.append(raceRound)

            raceName.innerHTML = ""
            raceName.innerHTML = `${race.raceName}`
            raceResultsTableRow.append(raceName)

            gridPos.innerHTML = ""
            gridPos.innerHTML = `${race.Results[0].grid}`
            raceResultsTableRow.append(gridPos)

            finPos.innerHTML = ""
            finPos.innerHTML = `${race.Results[0].position}`
            raceResultsTableRow.append(finPos)

        }
        
    }
    catch(e){
        console.log("DSfsdfsdsfsd", e)

    }
}

// Race results of each round
const raceResultYear = document.querySelector("#raceResultYear")
const raceResultRound = document.querySelector("#raceResultRound")
const raceResultAndRoundSubmit = document.querySelector("#raceResultAndRoundSubmit")

raceResultAndRoundSubmit.addEventListener("click", (e) => {

    while (raceYear.rows.length > 1) {
        raceYear.deleteRow(1);
      }

    raceResultsAndRound()
    e.preventDefault()
} )

// Race results of a specific round
const raceResultsAndRound = async () => {
    try{
        const res = await axios.get(`http://ergast.com/api/f1/${raceResultYear.value}/${raceResultRound.value}/results.json`)

        const raceClassification = res.data.MRData.RaceTable.Races[0].Results
        for(var raceClass of raceClassification){
            const raceName = res.data.MRData.RaceTable.Races[0].raceName
            const circuitName = res.data.MRData.RaceTable.Races[0].Circuit.circuitName
            const date = res.data.MRData.RaceTable.Races[0].date

            const raceYearGP = document.querySelector("#raceYearGP")
            raceYearGP.innerHTML = `${raceName}, `
            const raceYearCircuit = document.querySelector("#raceYearCircuit")
            raceYearCircuit.innerHTML = `${circuitName}, `
            const rraceYearDate = document.querySelector("#raceYearDate")
            raceYearDate.innerHTML = `${date}`

            const raceYearTable = document.querySelector("#raceYear")
            const raceYearRow = document.createElement("tr")

            raceYearTable.append(raceYearRow)

            const pos = document.createElement("td")
            const driver = document.createElement("td")
            const team = document.createElement("td")
            const points = document.createElement("td")

            pos.innerHTML = `${raceClass.position}`
            raceYearRow.append(pos)

            driver.innerHTML = `${raceClass.Driver.familyName}`
            raceYearRow.append(driver)

            points.innerHTML = `${raceClass.points}`
            raceYearRow.append(points)

            team.innerHTML = `${raceClass.Constructor.name}`
            raceYearRow.append(team)

        }
    }
    catch(e){
        console.log("sorry could not find", e)
    }
}

// qualifying round and year
const qualiResultYear = document.querySelector("#qualiResultYear")
const qualiResultRound = document.querySelector("#qualiResultRound")
const qualiSubmit = document.querySelector("#qualiSubmit")

qualiSubmit.addEventListener("click", (e) => {

    qualifying()
    
    e.preventDefault()
})

const qualifying = async () => {
    try{
        const res = await axios.get(`http://ergast.com/api/f1/${qualiResultYear.value}/${qualiResultRound.value}/qualifying.json`)

        const qualiResults = res.data.MRData.RaceTable.Races[0].QualifyingResults

        for (var quali of qualiResults){

            const qualYear = document.querySelector("#qualYear")
            const qualYearRow = document.createElement("tr")

            qualYear.append(qualYearRow)

            const qualPos = document.createElement("td")
            const qualDriver = document.createElement("td")        
            const qualTeam = document.createElement("td")

            qualPos.innerHTML = `${quali.position}`
            qualYearRow.append(qualPos)

            qualDriver.innerHTML = `${quali.Driver.familyName}`
            qualYearRow.append(qualDriver)

            qualTeam.innerHTML = `${quali.Constructor.name}`
            qualYearRow.append(qualTeam)

        }    
    }
    catch(e){
        console.log("Sorry! Not available", e)
    }
}

// World Driver's Champ
const driverChampYear = document.querySelector("#driverChampYear")
const driverChampSubmit = document.querySelector("#driverChampSubmit")

driverChampSubmit.addEventListener("click", (e) => {
    driversChamps()
    e.preventDefault()
})

const driversChamps = async () =>{
    try{
        const res = await axios.get("http://ergast.com/api/f1/driverStandings/1.json")
        const standingsTable = res.data.MRData.StandingsTable.StandingsLists

        for(var standingTable of standingsTable){

            if(driverChampYear.value == standingTable.season){

                const champName = document.querySelector("#champName")
                champName.innerHTML = "Full Name: "
                champName.append(`${standingTable.DriverStandings[0].Driver.givenName} ${standingTable.DriverStandings[0].Driver.familyName}`)

                const champTeam = document.querySelector("#champTeam")
                champTeam.innerHTML = "Team: "
                champTeam.append(`${standingTable.DriverStandings[0].Constructors[0].name}`)

                const champWins = document.querySelector("#champWins")
                champWins.innerHTML = "Wins: "
                champWins.append(`${standingTable.DriverStandings[0].wins}`)

                const champPoints = document.querySelector("#champPoints")
                champPoints.innerHTML = "Points: "
                champPoints.append(`${standingTable.DriverStandings[0].points}`)

            }
        }
    }
    catch(e){
        console.log("sdfsdfsfsfs", e)
    }
}

const teamChampYear = document.querySelector("#teamChampYear")
const teamChampSubmit = document.querySelector("#teamChampSubmit")

teamChampSubmit.addEventListener("click", (e) =>{
    constructorChamps();
    e.preventDefault();
})


//World constructor champions
const constructorChamps = async () =>{
    try{
        const res = await axios.get("http://ergast.com/api/f1/constructorStandings/1.json")
        // console.log(res.data.MRData)

        // console.log(res.data.MRData.StandingsTable.StandingsLists)
        const constWinners = res.data.MRData.StandingsTable.StandingsLists

        for(var constWinner of constWinners){

            if(teamChampYear.value == constWinner.season){
            const teamName = document.querySelector("#teamName")
            teamName.innerHTML = "Constructor: "
            teamName.append(constWinner.ConstructorStandings[0].Constructor.name)
            const teamNation = document.querySelector("#teamNation")
            teamNation.innerHTML = "Country: "
            teamNation.append(constWinner.ConstructorStandings[0].Constructor.nationality)
            const teamWins = document.querySelector("#teamWins")
            teamWins.innerHTML = "Wins: "
            teamWins.append(constWinner.ConstructorStandings[0].wins)
            const teamPoints = document.querySelector("#teamPoints")
            teamPoints.innerHTML = "Points: "
            teamPoints.append(constWinner.ConstructorStandings[0].points)

            }            
        }

    }
    catch(e){
        console.log("sdfsdfsfsfs", e)
    }
}

// drivers championship of each year
const driverChampSeason = document.querySelector("#driverChampSeason")
const driverChampSeasonSubmit = document.querySelector("#driverChampSeasonSubmit")
driverChampSeasonSubmit.addEventListener("click", (e) =>{

    while (driverChampSeasonTable.rows.length > 1) {
        driverChampSeasonTable.deleteRow(1);
      }
    yearEndDrivers()
    e.preventDefault()
})

const yearEndDrivers = async () => {
    try{
        const res = await axios.get(`http://ergast.com/api/f1/${driverChampSeason.value}/driverStandings.json`)       
        const driverEndStandings = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings

        for(var driverEndStanding of driverEndStandings){

            const driverChampSeasonTable = document.querySelector("#driverChampSeasonTable")
            const driverChampSeasonRow = document.createElement("tr")
            driverChampSeasonTable.append(driverChampSeasonRow)

            const pos = `${driverEndStanding.position}`
            const name = `${driverEndStanding.Driver.familyName}`
            const points = `${driverEndStanding.points}`
            const wins = `${driverEndStanding.wins}`
            const team = `${driverEndStanding.Constructors[0].name}`

            const driversPos = document.createElement("td")
            driversPos.innerHTML = pos
            driverChampSeasonRow.append(driversPos)

            const driversName = document.createElement("td")
            driversName.innerHTML = name
            driverChampSeasonRow.append(driversName)

            const driversPoints = document.createElement("td")
            driversPoints.innerHTML = points
            driverChampSeasonRow.append(driversPoints)

            const driversWins = document.createElement("td")
            driversWins.innerHTML = wins
            driverChampSeasonRow.append(driversWins)

            const driversTeam = document.createElement("td")
            driversTeam.innerHTML = team
            driverChampSeasonRow.append(driversTeam)


        }

    }
    catch(e){
        console.log("not working", e)
    }
}

// constructors championship of each year

const teamChampEnd = document.querySelector("#teamChampEnd")
const teamChampEndSubmit = document.querySelector("#teamChampEndSubmit")
teamChampEndSubmit.addEventListener("click", (e) =>{

    while (teamChampEndTable.rows.length > 1) {
        teamChampEndTable.deleteRow(1);
      }
    yearEndConstructors()
    e.preventDefault()
})

const yearEndConstructors = async () => {
    try{
        const res = await axios.get(`http://ergast.com/api/f1/${teamChampEnd.value}/constructorStandings.json`)
        const teamStandings = res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings

        for(var teamStanding of teamStandings){

            const teamChampEndTable = document.querySelector("#teamChampEndTable")
            const teamChampEndRow = document.createElement("tr")
            teamChampEndTable.append(teamChampEndRow)

            const pos = teamStanding.position
            const points = teamStanding.points
            const wins = teamStanding.wins
            const team = teamStanding.Constructor.name

            const standingsPos = document.createElement("td")
            standingsPos.innerHTML = pos
            teamChampEndRow.append(standingsPos)

            const StandingsTeam = document.createElement("td")
            StandingsTeam.innerHTML = team
            teamChampEndRow.append(StandingsTeam)

            const standingsPoints = document.createElement("td")
            standingsPoints.innerHTML = points
            teamChampEndRow.append(standingsPoints)

            const standingsWins = document.createElement("td")
            standingsWins.innerHTML = wins
            teamChampEndRow.append(standingsWins)

        }
    }   
    catch(e){
        console.log("not working", e)
    }
}
