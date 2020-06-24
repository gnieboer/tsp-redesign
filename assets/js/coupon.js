//const values &strings
var init_cell = "CH.1"
var stop_type = "button"
var message = "Print Loan Coupon"
var ns6=document.getElementById&&!document.all
var ie5=(((document.getElementById)? true: false) && document.all)? true : false
onstart()
//edit rules at indivi cells: type, msg, rules, disable
var valid_aphs= [2,["Please enter a valid character."],[""], false]
var valid_spls= [5,[""],[""],false]
var valid_ltrs= [2,["Valid letters are: E, F, G, H, M, R, S, U."],["E", "F", "G", "H", "M", "R", "S", "U"],false]
var valid_baks= [5,[""],["24", "8"],false]
var valid_nums= [2,["Please enter a number."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_lnx1= [2,["Invalid loan number. A digit between 0 and 9 is required."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_lnx2= [2,["Invalid loan number. A digit between 0 and 9 is required."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_lnx3= [2,["Invalid loan number. A digit between 0 and 3 is required."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_lnx4= [2,["Invalid loan number. A digit between 0 and 9 is required."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_lnx5= [2,["Invalid loan number. A digit between 0 and 9 is required."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_lnx6= [2,["Invalid loan number. A digit between 0 and 9 is required."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_lnx7= [2,["Invalid loan number. A digit between 0 and 9 is required."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_yrs1= [2,["Invalid entry."],["2"],false]
var valid_yrs2= [2,["Invalid entry."],["0"],false]
var valid_yrs3= [3,["Please enter a valid year."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_yrs4= [3,["Please enter a valid year."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_mns1= [3,["Please enter a valid month."],["0", "1"],false]
var valid_mns2= [3,["Please enter a valid month."],["0", "1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_mn12= [3,["Please enter a valid month."],["0", "1", "2"],false]
var valid_day1= [3,["Please enter a valid day."],["0", "1", "2", "3"],false]
var valid_day2= [3,["Please enter a valid day."],["0","1", "2", "3", "4", "5", "6", "7","8","9"],false]
var valid_day3= [3,["Please enter a valid day."],["0", "1"],false]
var valid_day4= [3,["Please enter a valid day."],["1"],false]
var valid_day5= [3,["Please enter a valid day."],["0", "1", "2"],false]
var valid_ssns= [0,["Your social security number is incomplete."],["1","9"],false]
var valid_loan= [0,["Your loan number is incomplete."],["1","13"],false]
var valid_chdt= [0,["Please complete check date."],["1","8"],false]
var valid_loan= [0,["Payment amount field is incomplete."],["1","7"],false]
var valid_skip= ["DC.7", "DC.4"]

//rules to be applied at print time.
var valid_ptruls= [  
  //short, long, start, end, len, padding, pattern, pattern for clear,isor, disable
  ["DC", "Date of Check", "1","8", "8", false, 255,12,false,false],
  ["SS", "TSP Account Number", "1","13", "13", false,511,0, false,false],
  ["LN", "Loan Number", "1","8", "8", false,255,0,false,false],
//["LN", "Loan Number Letter", "8","8", "1", false,1,0,false,false],   
  ["CH", "Check Number", "1","10", "10", false,2047,0,true,true], 
  ["PA", "Payment Amount", "1","7", "7", true, 7,0,false,false],
  ["NL", "Last Name", "1","17", "17", true, 0377777,0,true,true], 
  ["NF", "First Name", "18","27", "10", true, 01777,0,true,true]
] 
//rules as a linked list for tabbing along
var valid_tabs= [  
  ["CH", "DC","1",true], 
  ["DC", "NL","1",true], 
  ["NL", "NF","18",true], 
  ["NF", "NM","28",true], 
  ["NM", "SS","1",true], 
  ["SS", "LN","1",true], 
  ["LN", "PA","1",true], 
  //["LN", "PA","8",false],  
  ["PA", "CH","1",true]  
] 

var checkthem=false

var ermsg="";
var ersrc="";
var erln="";

window.onerror=onexception
onstart()

function oncoup() {
  document.forms[0].elements[init_cell].focus();
	return true; 
}

function onexception(msg, src, ln) {
  ermsg=msg;
  ersrc=src;
  erln=ln;
  alert('A system error has occurred:\n' +      "   Error Type:" + msg + "\n" +
                                                "   Error Src: " + ersrc + msg + "\n" +
                                                "   Error Loc: " + erln) ;   
	return true; 
}

// utilities stuff bel;ow
function printpage(e) {
  if (!window.print) alert("Your print can't be fired up")
  else if ( checkprint(e)) window.print();
}

function clearpage(e) {
  return true 
}

function show(msg) {
  //alert(msg)
}
function hello(e) {
  //alert(" what is it ")
}

function getKey(e) {
  if (ns6) return e.which;
  if (ie5) return event.keyCode;
}

function getCharCode(e) {
  return String.fromCharCode(getKey(e))
}

function getTarget(e) {
  if (ie5) {
    return event.srcElement
  } else if (ns6) {
    return e.target
  }
}

function getChar(e) {
  var key = getKey(e);
  return key;
}


function isInDefList(list, item) {
    for(var i = 0; i < list.length; i++)
    if(list[i] == item)
    return true
    return false
}

function isInDef(list, item) {
    var found = false
    for(var i in list) {
      if(i == item) {
      break;
     }
    }
    return found;
}

function getnext(e) {

  var input =e
  var index = -1
  if ( input.type!= "text" ) return null; 
  if ( valid_skip[1] == input.name)
  return document.getElementsByName(valid_skip[0])[0]
  for (var i = 0; i < input.form.length; i++) {
    
    if (input.form[i] == input){
      index = i
      break;
    }
  }
  return input.form[(index+1) % input.form.length]
}

function getprev(e) {
  var input =e
  var index = -1
  if ( input.type!= "text" ) return null;
  if ( valid_skip[0] == input.name)
  return document.getElementsByName(valid_skip[1])[0]
  for (var i = 0; i < input.form.length; i++)
    if (input.form[i] == input){
      index = i
      break
    }
  if (index<= 0)index=1;
    
  return input.form[(index-1) % input.form.length]
}



function isEmpty(str) {
  return !(str!= null && str.length > 0)	 	
}

function isNumCode(c) {
  if ( c=='undefined' || c== null) 
	  return false
  return (c >= 48) && (c <= 57);
}


function isSpecialCode(c) {
  return c==00 || c==010 || c==011 || c==030 || c==0177;
}

function isAllow(c) {
  if ( c=='undefined' || c== null) 
	  return false
  return ((c >= 0) && (c <= 0177)) 
}

function isReject(c) {
  if ( c=='undefined' || c== null) 
	  return false
  return true 
}


function jump(e){ 
  var input =getTarget(e); 
  input.value=getCharCode(e)
  var input2 = getnext(input);
  var nme = stop_type.split();
  if (input2 && input2.type==stop_type)
  input2 = document.getElementsByName(init_cell)[0]
  if ( input2!= 'undefined' || input2== null) 
  input2.focus()
  if (typeof e.preventDefault == 'function') e.preventDefault()
  return false; 
}


function stay(e){ 
  return false; 
}


function arrestit(e){ 
  e.stopPropagation()
  e.preventDefault()
}


function isValidType(def, e){ 
  var keycode = getKey(e)
  var chcode =getCharCode(e)
  var input =getTarget(e); 

  if ( !isInDefList(def[2], chcode.toUpperCase())){
    input.value=""
    if (ns6) arrestit(e)
    if (ie5)  event.cancelBubble=true
    input.value=""
    alert(def[1])
    return false;
  } else {
    return true; 
  }
}


//getKey
function onstart(){
  if (ie5)document.onkeypress=function(){ return isValid(event)}
  if (ns6)document.addEventListener('keypress', function(event) { isValid(event) }, false)
  document.onkeydown=isValidKey
}


//custom tab control
function dotab(e){ 
  var input2, input =getTarget(e)
 // alert("here I am 1");
  for (var i=0;i<valid_tabs.length&&input!=null; i++) {
    var eee = input.name.substring(0,2);
    if (valid_tabs[i][0].indexOf(input.name.substring(0,2))>=0 &&eval(valid_tabs[i][3])){
      input2 = document.getElementsByName(valid_tabs[i][1]+"." + valid_tabs[i][2])[0]
      if ( input2!= 'undefined' && input2!= null) {
        //alert("here I am 2");
        if (ns6) arrestit(e)
        input2.focus();
        break;
      }
    }
  }
  return false; 
}

function isValidKey(e) {
  var t= getKey(e)
  var input = getTarget(e)
  if (isSpecialCode(t)){
    if (t==011) {
       return dotab(e)
    }
    input.value=""
    var obj = getprev(input)
    var end = document.getElementsByName(init_cell)[0]
    if (obj!= 'undefined' && obj!= null ) 
    if (obj.type=="reset" || input.name ==end.name) {
      if (ns6) arrestit(e)
      if (ie5) {
        event.cancelBubble=true
        event.returnValue=false
      }
      return true;
    }else {
      obj.value=""
      obj.focus()    
      return false
    }
  }
  return true;
}


// main script, invoked for validating input against a rules table. Needs dynamic dim later
function isValid(e){ 
  var keycode = getKey(e)
  var obj = getTarget(e)
  if (obj.type=='undefined' || obj.type== null ) return false;
  
  if (isSpecialCode(keycode)){
    if (ns6 && keycode ==0) arrestit(e)
    return false;
  }
  
  var type = obj.name.substring(0, 2) + "IDX"  
  var index = obj.name.substring(3) 
  
  switch(type) {
    case 'LNIDX':
      switch(index) {
        case '1':
          if (isValidType(valid_lnx1, e)) return jump(e)   
          if ( isReject(keycode)) return stay(e)
          return false;
                        
        case '2':
          if (isValidType(valid_lnx2, e)) return jump(e)   
          if ( isReject(keycode)) return stay(e)
          return false; 
                
        case '3':
          if (isValidType(valid_lnx3, e)) return jump(e)   
          if ( isReject(keycode)) return stay(e)
          return false;   
               
        case '4':
          if (isValidType(valid_lnx4, e)) return jump(e)   
          if ( isReject(keycode)) return stay(e)
          return false;  
                
        case '5':
          if (isValidType(valid_lnx5, e)) return jump(e)   
          if ( isReject(keycode)) return stay(e)
          return false;   
             
        case '6': 
          if (isValidType(valid_lnx6, e)) return jump(e)   
          if ( isReject(keycode)) return stay(e)
          return false; 
                
        case '7':
          if (isValidType(valid_lnx7, e)) return jump(e)   
          if ( isReject(keycode)) return stay(e)
          return false;       
        
        case '8':
          if (isValidType(valid_ltrs, e))  return jump(e)
          if ( isReject(keycode)) return stay(e)      
       
        default:
        alert("Error with " + obj.name + ".  Please press Clear and try again.")
        return false          
      }
    
    // payment amount
    case 'PAIDX':
      if (isValidType(valid_nums, e))  return jump(e) 
      if ( isReject(keycode)) return stay(e)  
    // ssn
    case 'SSIDX':
      if (isValidType(valid_nums, e))  return jump(e) 
      if ( isReject(keycode)) return stay(e)  
    //names
    case 'NLIDX':
    case 'NMIDX': 
    case 'NFIDX':
      if ( isAllow(getChar(e))) return jump(e)   
      if ( isReject(keycode)) return stay(e)  
    //check id
    case 'CHIDX':
    
      switch(index) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6': 
        case '7':     
        case '8':
        case '9':
        case '10':  
        case '11': 
        if( isAllow(getChar(e)))  return jump(e) 
        if ( isReject(keycode)) return stay(e)  
        default:
        alert("Error with " + obj.name + ".  Please press Clear and try again.")    
        return false 
      }
    
    case 'DCIDX':
      switch(index) {
        case '1':
        if (isValidType(valid_mns1, e)) return jump(e) 
        if ( isReject(keycode)) return stay(e)  
        case '2':
        var prev = getprev(getTarget(e))
        if ( eval(prev.value) ==1) {
          if (isValidType(valid_mn12, e)) return jump(e) 
          if ( isReject(keycode)) return stay(e) 
        } else {
          if (isValidType(valid_mns2, e)) return jump(e) 
          if ( isReject(keycode)) return stay(e) 
        }     
         return false; 
        case '3':
        if (isValidType(valid_day1, e)) return jump(e) 
        if ( isReject(keycode)) return stay(e)      

        case '4':
          var prev = getprev(getTarget(e))
          var val = eval(prev.value)
          if ( val ==3 ) {
            if (isValidType(valid_day3, e)) return jump(e) 
            if ( isReject(keycode)) return stay(e) 
          } else {
            if (isValidType(valid_day2, e)) return jump(e)  
            if ( isReject(keycode)) return stay(e)  
          }      
         return false;   
        case '5':
        if (/*isValidType(valid_yrs1, e)*/ true) return jump(e) 
        if ( isReject(keycode)) return stay(e)  
        case '6':
        if (/*isValidType(valid_yrs2, e)*/ true) return jump(e)   
        if ( isReject(keycode)) return stay(e)        
        case '7':
        if (isValidType(valid_yrs3, e)) return jump(e) 
        if ( isReject(keycode)) return stay(e)        
        case '8':
        if (isValidType(valid_yrs4, e)) return jump(e)  
        if ( isReject(keycode)) return stay(e)  
        default:
        alert("Error with " + obj.name + ".  Please press Clear and try again.")  
        return false      
      }
  }
  return false
}



//extract data from a cell location
function getInput(id, start, end, paddingh){ 
  var ele=null, value="", item,started =false

  for ( var i=start; i<=end; i++) {

    ele = document.getElementsByName(id + "." + i)[0]
    if (ele=='undefined' || ele== null ) 
    return null

    if ( paddingh) {
      if ( !started && !isEmpty(ele.value))
        started = true
    } else {
      if (i==start &&!started)
        started = true
    }
   
    item = ele.value

    if (isEmpty(value))value = item
    else value =value.concat(item)

  }
  return value
}

//extract data entry pattern in terms good/bad
function getPattern(id, start, end, paddingh){ 
  var ele=null, value="", item,started =false

  for ( var i=start; i<=end; i++) {

    ele = document.getElementsByName(id + "." + i)[0]
    if (ele=='undefined' || ele== null ) 
    return null

    if ( paddingh) {
      if ( !started && !isEmpty(ele.value))
        started = true
    } else {
      if (i==start &&!started)
        started = true
    }
   
    item = ele.value
    if ( started && isEmpty(item)) {
      item='0'
    } else if (started && !isEmpty(item)){
      item='1'
    }
    
    if (isEmpty(value))value = item
    else value =value.concat(item)

  }
  return value
}



//walk through each section, collect entry, validate them using predefined rules
function doprintcheck(e){ 

  var index = 1, list = new Array(), isdirty = false, str, strhead = "Please correct the following errors:\n\n", input = getTarget(e)
  
  if ("print".indexOf(input.name.toLowerCase()) >= 0 ) {
    
    for (var i = 0, str=""; i < valid_ptruls.length; i++) {
      list[i]=  getPattern( valid_ptruls[i][0],  
                          valid_ptruls[i][2],
                          valid_ptruls[i][3], 
                          eval(valid_ptruls[i][5]) )   
    }
    var td1, td2
    // check for intit state in case a blank page
    for (var i = 0; i < list.length; i++) {

      if ( list[i]== "undefined" || list[i] == null ) {
        str = ("An error occurred.  Please press Clear and try again.")
        return str 
      } else if (eval(valid_ptruls[i][9])){
        continue
      }   

      if (!checkthem) {
        if (list[i]!= null&&list[i].length==0)
        list[i] = "0";
        td1= eval(valid_ptruls[i][7])
        td2= parseInt(list[i],2)     
        if ( td2 =="NaN"){
          isdirty = isdirty
        }else if (td1==td2) {
          isdirty = false
        } else {
          isdirty = true
        }
      }
      if ( checkthem || isdirty) {
      var anrlst = (eval(valid_ptruls[i][6])&parseInt(list[i],2))
      if (!eval(valid_ptruls[i][8])){
        if (anrlst==valid_ptruls[i][6]){
          continue
        }else  {
          str = str + "Error " + index + " :  "
          str = str + valid_ptruls[i][1] + "\n"
          index++
        }    
      } else {
        if (anrlst >0){
          continue
        }else  {
          str = str + "Error " + index + " : "
          str = str + valid_ptruls[i][1] + "\n"
          index++
        }    
      }  
      }  
    }   

    if (checkthem) {
      for (var i = 0; i < list.length; i++) {      
        if (list[i]!= null&&list[i].length==0)
        list[i] = "0";
        td1= eval(valid_ptruls[i][7])
        td2= parseInt(list[i],2)     
        if ( td2 =="NaN"){
          isdirty = isdirty
        }else if (td1==td2) {
          isdirty = false
        } else {
          isdirty = true
          break
        }
      } 
      if ( str.length > 1)
        if (isdirty) 
        return strhead + str
      return null       
    } 
  }
  if ( str.length > 1)
    return strhead + str
  return null 
}



//called when print button is hit. Check if fields in right state
function checkprint(e){ 
  var rlst = doprintcheck(e)
  if ( rlst!= null && rlst.length > 0 ){
    alert(rlst)
    return false
  } else {
    return true
  }
}


