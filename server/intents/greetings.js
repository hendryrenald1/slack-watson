'use strict'
var responseText='';
   var docList ='';
module.exports.process = function(intentData,cb) {

    console.log ('Below the Entities value ');
    if (intentData.entities.length > 0)  {
        // Need to call a service and fetch list of doctors available
      //console.log ( "The Entity Value :"+ JSON.stringify(intentData.entities[0]) );
      if(intentData.entities[0].entity == 'response' &&  intentData.entities[0].value=='yes' && intentData.output.text[0]=='DISPLAY_AVAIL_DOC' ) {

           /*
           * Call the REST Client to fetch the list of doctors
           */ 

            // Install request by running "npm install --save request"
         
            var request = require("sync-request");
            
            var options = { method: 'GET',
            url: 'http://localhost:8081/getDoctors',
            //qs: { filter: 'REPLACE_THIS_VALUE' },
                    };

            var req = request('GET','https://fhir-mock-app.mybluemix.net/getDoctors')
            
            
            var doctors = JSON.parse(req.getBody())
            
            for (var doctor of doctors) {
                docList = docList + doctor.ID + " . "+ doctor.Name + " " 
                
            }
              console.log("Doctor List "+ docList)
            
            console.log("Doctor List Outside Var : "+ docList)
      

          responseText = "OK ! Here are the List of Doctors available ! Choose One " + docList;
          return cb(true,responseText)
      }

    if(intentData.entities[0].entity == 'get_selection' ) {
          responseText = "OK ! Do You want me to book an appointment for " + intentData.entities[0].value;
          return cb(true,responseText)
      }

    if(intentData.output.nodes_visited[0] == 'DOCTOR_SEL_YES' ) {
        // Need to call the service and book an appointment

          responseText = "OK !! I have booked appointment with " + intentData.context.doctor_sel;
          return cb(true,responseText)
      }


}
    return cb(true,intentData.output.text[0])

}