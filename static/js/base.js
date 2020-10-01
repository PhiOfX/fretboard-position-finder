var string_array = ['eString', 'bString', 'gString', 'dString', 'AString', 'ELowString']

var frets = ['one','two','three','four','five','six',
            'seven','eight','nine','ten','eleven', 'twelve',
            'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen']

function playtone(x, y){
  var audio = new Audio('static/media/tone_sounds/' + x + '.wav');
  var string = '.' + y
  audio.play();
  var root_class = document.querySelector(string + ' img.tone.' + x + '.active').classList.contains('root')
  if ( root_class == true ) {
  document.querySelector(string + ' img.tone.' + x + '.active').setAttribute('src', '/static/media/red_dot_active.svg');
  setTimeout(function () {
    document.querySelector(string + ' img.tone.' + x + '.active').setAttribute('src', '/static/media/red_dot.svg');
  }, 300)
  }
  else {
  document.querySelector(string + ' img.tone.' + x + '.active').setAttribute('src', '/static/media/yellow_dot_active.svg');
  setTimeout(function () {
    document.querySelector(string + ' img.tone.' + x + '.active').setAttribute('src', '/static/media/yellow_dot.svg');
  }, 300)
  }
}

function reset_fretboard(){
  var elements = document.querySelectorAll('.active');
  for (var i=0; i<elements.length; i++) {
    elements[i].classList.remove("active");
  }
  var tone_elements = document.querySelectorAll('.tone');
  for (var i=0; i<tone_elements.length; i++) {
    tone_elements[i].setAttribute('src', '/static/media/yellow_dot.svg')
  }
}

function getTonesFromDataScales(y){

  reset_fretboard()
  var frets = ['one','two','three','four','five','six',
              'seven','eight','nine','ten','eleven', 'twelve',
              'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen']
  var strings = ['ELowString', 'AString', 'dString',
                'gString', 'bString', 'eString']
  /* x sets the id of inversions */
  var i = 0;
  for (var key in scale_data[y]) {
    if (scale_data[y].hasOwnProperty(key)) {
      for (var z in scale_data[y][key][0]["tones"]) {
        var tone_name = scale_data[y][key][0]["tones"][z]
        var QuerySelect = document.querySelector('.' + key + ' img.tone.' + tone_name);
        if (QuerySelect != null){
          QuerySelect.classList.add('active');
        }
        /* Check every note that has a defined Query for not activating all chord tones */
        var QuerySelect = document.querySelector('.' + key + ' .note.' + tone_name);
        if (QuerySelect != null){
          QuerySelect.classList.add('active');
        }
        element = document.querySelectorAll('.' + tone_name + '.active');
        if (element.length > 2) {
          var pos_val = document.getElementById('position_select').value
          if (pos_val != 0){
            /* Count String Range of String X and String Y -> Deactivate Tone with wider range on */
            /* 1. Find String Name of Active Notes */
            var multiple_tone = tone_name;
            var list_of_strings = []
            for (variable in frets) {
              for (string in strings){
                if (document.querySelectorAll('.' + frets[variable] + '.' + strings[string] + ' .' + tone_name + '.active').length != 0 ){
                  /* push string into list */
                  list_of_strings.push(strings[string])
                }
              }
            }
            /* 2. Find Range lowest to highest Note on Strings */
            var first_string = []
            var second_string = []
            var available_strings = []
            for (string in strings){
              for (fret in frets){
                if (document.querySelectorAll('.' + list_of_strings[string] + '.' + frets[fret] + ' .active').length > 0){
                  if (string > 0){
                    second_string.push(fret)
                  }
                  else {
                    first_string.push(fret)
                  }
                  available_strings.push(list_of_strings[string])
                }
              }
            }
            var first_string_range = (first_string[first_string.length - 1]) - first_string[0]
            var second_string_range = (second_string[second_string.length - 1]) - second_string[0]
            var first_string = available_strings[1]
            var second_string = available_strings[available_strings.length - 1]
            /* 3. Deactivate Note with longest Range */
            console.log(first_string_range)
            console.log(second_string_range)
            if (first_string_range > second_string_range){
              element = document.querySelectorAll('.' + first_string + ' .' + tone_name);
              element[0].classList.remove("active")
              element[1].classList.remove("active")
            }
            else {
              element = document.querySelectorAll('.' + second_string + ' .' + tone_name);
              element[0].classList.remove("active")
              element[1].classList.remove("active")
            }
          }
        }
      }
    }
  }
}

function show_tension_notes_chords() {
  var x = document.getElementById('position_select').value
  var y = document.getElementById('note_range').value

  var tension_elements = document.querySelectorAll('.tensionname');
  if (tension_elements != undefined){
    for (var i=0; i<tension_elements.length; i++) {
      tension_elements[i].remove();
    }
  }

  var i = 0;
  for (var key in voicing_data[y][x][0]) {
    if (voicing_data[y][x][0].hasOwnProperty(key)) {
      var tone = voicing_data[y][x][0][key][0]
      var tension_name = voicing_data[y][x][0][key][1]

      var QuerySelect = '.' + key + ' .notename.' + tone + '.active';
      var selection = document.getElementsByClassName("note active " + tone)[0];
      if (typeof selection !== "undefined") {
          /* creating a div for tension notes */
          var node = document.createElement("DIV");
          node.className = "tensionname";
          document.getElementsByClassName("active note " + tone)[0].appendChild(node);
          var textnode = document.createTextNode(tension_name);
          node.appendChild(textnode);
          /* Remove class for not showing Notename */
          var QuerySelect = document.querySelector('.' + key + ' .notename.' + tone + '.active');
          if (QuerySelect != null){
            QuerySelect.classList.remove("active")
          }
      }
    }
    /* add class active for showing up */
    var tension_names = document.querySelectorAll('.tensionname')
    for (var i=0; i<tension_names.length; i++) {
      tension_names[i].classList.add("active");
    }
    var button = document.getElementById("show_tension_button")
    button.setAttribute("onclick","getToneNameFromDataChords()")
    button.innerHTML = 'Tone Names';
  }

}

function getToneNameFromDataChords() {
  var button = document.getElementById("show_tension_button")
  button.setAttribute("onclick","show_tension_notes_chords()")
  button.innerHTML = 'Show Tensions';
  var pos_val = document.getElementById('position_select').value
  var note_range = document.getElementById('note_range').value
  getTonesFromDataChords(pos_val, note_range)
}

function getNoteNameFromData(){
  /* x sets the id of inversions */
  y = document.getElementById('position_select').value
  var i = 0;
  for (var key in scale_data[y]) {
    if (scale_data[y].hasOwnProperty(key)) {
      for (var z in scale_data[y][key][0]["tones"]) {
        var tone_name = scale_data[y][key][0]["tones"][z]
        var QuerySelect = document.querySelector('.' + key + ' .notename.' + tone_name);
        if (QuerySelect != null){
          QuerySelect.classList.add("active")
        }
      }
    }
  }
  var button = document.getElementById("show_note_name_button")
  button.setAttribute("onclick","getNotePicFromData()")
  button.innerHTML = 'Only Tones';
}
function getNotePicFromData(){
  /* x sets the id of inversions */
  var notename_elements = document.querySelectorAll('.notename');
  if (notename_elements != undefined){
    for (var i=0; i<notename_elements.length; i++) {
      notename_elements[i].classList.remove('active');
    }
  }
  var button = document.getElementById("show_note_name_button")
  button.setAttribute("onclick","getNoteNameFromData()")
  button.innerHTML = 'Note Name';
}
function navBarFretboardChords(class_name){
  var x, i, j, selElmnt, a, b, c;
  /* Look for any elements with the class "sfbsf": */
  x = document.getElementsByClassName(class_name);
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "sese");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "slit sehi");
    for (j = 1; j < selElmnt.length; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("swasd");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "swasd");
            break;
          }
        }
        h.click();
        var pos_val = document.getElementById('position_select').value
        var note_range = document.getElementById('note_range').value
        getTonesFromDataChords(pos_val, note_range)
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("sehi");
      this.classList.toggle("slar-active");
    });
  }
}

function closeAllSelect(elmnt) {
  /*  Close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("slit");
  y = document.getElementsByClassName("sese");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("slar-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("sehi");
    }
  }
}
