/*  Name: Aaditya Mukherjee
Affiliation: Computer Science Student at UMass Lowell
E-mail: Aaditya_Mukherjee@student.uml.edu
91.61 GUI Programming I, Assignment 7
Sources: https://www.youtube.com/watch?v=zhxQhgm4yk4&t=200s    (The first two sources were used to figure out how to make multiplication tables with for loops)
           : https://www.youtube.com/watch?v=zhxQhgm4yk4&t=200s
           :https://github.com/jquery-validation/jquery-validation/issues/2030 (This page was used to make the greaterThan function)
           :https://www.w3schools.com/
*/
$.validator.addMethod( "greaterThan", function( value, element, param ) {
  var target = $( param );

  if ( this.settings.onfocusout && target.not( ".validate-greaterThan-blur" ).length ) {
      target.addClass( "validate-greaterThan-blur" ).on( "blur.validate-greaterThan", function() {
          $( element ).valid();
      } );
  }
  return Number(value) >= Number(target.val());

});


$(function() {                  //Wait for page to be ready then load.
  $("#formname").validate({
    rules: {
      min_row: {       //All four inputs are given restrictions which it will follow, or the table won't load.
        required: true,       //An input is required
        digits: true         //It needs to be a positive integer, no decimals, no negative numbers

       },
       min_column: {
         required: true,
         digits: true

       },


      max_column: {
        required: true,
        digits: true,
        greaterThan: [min_column, min_column]    //greaterThan function applied to check if upper limit is greater than lower limit
      },


      max_row: {
        required: true,
        digits: true,
        greaterThan: [min_row, min_row]
      }
    },


    messages: {                                   //Custom error messages for invalid inputs based on the rules
      min_column: {
            required: "This field is required.",
            digits: "A positive integer is required."



    },
      min_row: {
            required:"This field is required.",
            digits:"A positive integer is required."

          },


      max_column: {
        required: "This field is required.",
        digits: "A positive integer is required.",
        greaterThan: "Enter a value greater than minimum column value."
      },


      max_row: {
        required: "This field is required.",
        digits: "A positive integer is required.",
        greaterThan: "Enter a value greater than minimum row value. "
      }
    },

    submitHandler: function(form){              //table generates after handling all errors
        generate();
    }
  });
});







function generate() {

  var h1 = Number(document.getElementById("min_column").value);
  var h2 = Number(document.getElementById("max_column").value);

  var v1 = Number(document.getElementById("min_row").value);
  var v2 = Number(document.getElementById("max_row").value);

  var output = "<tr><th> </th>";

for(var i = h1; i <= h2; i++){

output += "<th>" + i + "</th>"; // adds input values for columns

}

output += "</tr>";

for(var j = v1; j <= v2; j++) {

output += "<tr><th>" + j + "</th>"; // add input values for rows

for(var k = h1; k <= h2; k++) {

output += "<td>" + j*k + "</td>"; //Table cells get filled with the appropriate calculations of the column and row heads

}

output += "</tr>";

}


var table = document.getElementById("multi_table").innerHTML = output;  //assign the table to html id

}
