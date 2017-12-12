// suite('Navigation', function() {
//   let range, fireKeyboardEvent;

//   setup(function(done) {
//     range = fixture('range');
//     fireKeyboardEvent = function(elem, key){
//       var evt = new CustomEvent('keydown',{detail:{'key':key,'keyIdentifier':key}});
//        elem.dispatchEvent(evt);
//     };
//     flush(()=>{
//       done();
//     });
//   });

//   test('navigation from from to to', function(done) {
//     var fields = Polymer.dom(range.root).querySelectorAll('px-datetime-field'),
//         fromEntries = Polymer.dom(fields[0].root).querySelectorAll('px-datetime-entry'),
//         fromTimeCells = Polymer.dom(fromEntries[1].root).querySelectorAll('px-datetime-entry-cell');
//     var spy = sinon.spy(range, '_focusFirstToEntry');

//     fireKeyboardEvent(fromTimeCells[fromTimeCells.length - 1], 'ArrowRight');

//     setTimeout(function() {
//       assert.isTrue(spy.called);

//       //unwrap spy
//       range._focusFirstToEntry.restore();
//       done();
//     },100);
//   });

//   test('navigation from from to to doesnt trigger next-field from the outside', function(done) {
//     var fields = Polymer.dom(range.root).querySelectorAll('px-datetime-field'),
//         fromEntries = Polymer.dom(fields[0].root).querySelectorAll('px-datetime-entry'),
//         fromTimeCells = Polymer.dom(fromEntries[1].root).querySelectorAll('px-datetime-entry-cell');

//     var listener = function() {
//       range.removeEventListener('px-next-field', listener);
//       assert.isTrue(false);
//       done();
//     };
//     range.addEventListener('px-next-field', listener);

//     fireKeyboardEvent(fromTimeCells[fromTimeCells.length - 1], 'ArrowRight');

//     setTimeout(function() {
//       range.removeEventListener('px-next-field', listener);
//       done();
//     }, 200);
//   });

//   test('navigation from to to from', function(done) {
//     var fields = Polymer.dom(range.root).querySelectorAll('px-datetime-field'),
//         toEntries = Polymer.dom(fields[1].root).querySelectorAll('px-datetime-entry'),
//         todateCells = Polymer.dom(toEntries[0].root).querySelectorAll('px-datetime-entry-cell');
//     var spy = sinon.spy(range, '_focusLastFromEntry');

//     fireKeyboardEvent(todateCells[0], 'ArrowLeft');

//     setTimeout(function() {
//       assert.isTrue(spy.called);

//       //unwrap spy
//       range._focusLastFromEntry.restore();
//       done();
//     },100);
//   });

//   test('navigation from to to from doesnt trigger previous-field from the outside', function(done) {
//     var fields = Polymer.dom(range.root).querySelectorAll('px-datetime-field'),
//         toEntries = Polymer.dom(fields[1].root).querySelectorAll('px-datetime-entry'),
//         todateCells = Polymer.dom(toEntries[0].root).querySelectorAll('px-datetime-entry-cell');

//     var listener = function() {
//       range.removeEventListener('px-previous-field', listener);
//       assert.isTrue(false);
//       done();
//     };
//     range.addEventListener('px-previous-field', listener);

//     fireKeyboardEvent(todateCells[0], 'ArrowLeft');

//     setTimeout(function() {
//       range.removeEventListener('px-previous-field', listener);
//       done();
//     }, 200);
//   });
// });

suite('submit without buttons', function() {
  let range, fields, fromEntries, fromTimeCells, fireKeyboardEvent;

  setup(function(done) {
    range = fixture('range');
    range.fromMoment = Px.moment().subtract(7, 'day');
    range.toMoment = Px.moment();
    fireKeyboardEvent = function(elem, key){
      var evt = new CustomEvent('keydown',{detail:{'key':key,'keyIdentifier':key}});
      elem.dispatchEvent(evt);
    };

    flush(()=>{
      //make sure we focus 'to' field as next tests work on 'to'
      fields = Polymer.dom(range.root).querySelectorAll('px-datetime-field'),
      fromEntries = Polymer.dom(fields[0].root).querySelectorAll('px-datetime-entry'),
      fromTimeCells = Polymer.dom(fromEntries[1].root).querySelectorAll('px-datetime-entry-cell');
      fireKeyboardEvent(fromTimeCells[fromTimeCells.length - 1], 'ArrowRight');
      done();
    });
  });

  test('event is not fired when changing invalid value', function(done) {
    var fields = Polymer.dom(range.root).querySelectorAll('px-datetime-field'),
        toEntries = Polymer.dom(fields[1].root).querySelectorAll('px-datetime-entry'),
        todateCells = Polymer.dom(toEntries[0].root).querySelectorAll('px-datetime-entry-cell'),
        dateInput = Polymer.dom(todateCells[1].root).querySelector('input'),
        e = document.createEvent('Event'),
        i=0;

    var listener = function(evt) {
      i++;
    };

    debugger

    range.addEventListener('px-datetime-range-submitted', listener);

    //invalid month, should not trigger event
    dateInput.value = '99';
    e.initEvent("blur", true, true);
    dateInput.dispatchEvent(e);

    setTimeout(function() {
      assert.equal(i, 0);
      assert.isFalse(range.isValid);
      assert.isTrue(range._isRangeValid);
      range.removeEventListener('px-datetime-range-submitted', listener);
      done();
    }, 100);
  });

  test('event is fired when changing valid value', function(done) {
    var fields = Polymer.dom(range.root).querySelectorAll('px-datetime-field'),
        toEntries = Polymer.dom(fields[1].root).querySelectorAll('px-datetime-entry'),
        todateCells = Polymer.dom(toEntries[0].root).querySelectorAll('px-datetime-entry-cell'),
        i = 0;

    var listener = function(evt) {
      i++;
    };

    range.addEventListener('px-datetime-range-submitted', listener);

    //valid month, should trigger event
    fireKeyboardEvent(todateCells[1], '1');
    fireKeyboardEvent(todateCells[1], '2');

    setTimeout(function() {
      assert.equal(i, 1);
      assert.isTrue(range.isValid);
      assert.isTrue(range._isRangeValid);
      range.removeEventListener('px-datetime-range-submitted', listener);
      done();
    }, 100);
  });

});

// suite('submit with buttons', function() {
//   let range, fireKeyboardEvent;

//   setup(function(done) {
//     range = fixture('range');
//     range.fromMoment = Px.moment().subtract(7, 'day');
//     range.toMoment = Px.moment();
//     range.showButtons = true;
//     fireKeyboardEvent = function(elem, key){
//       var evt = new CustomEvent('keydown',{detail:{'key':key,'keyIdentifier':key}});
//        elem.dispatchEvent(evt);
//     };
//     flush(()=>{
//       done();
//     });
//   });

//   test('event is not fired when changing valid value + buttons', function(done) {
//     var i = 0;

//     var listener = function(evt) {
//       i++;
//       //make sure string has been kept in sync
//       assert.isTrue(false);
//     };

//     range.addEventListener('px-datetime-range-submitted', listener);

//     //do a change
//     range.fromMoment = range.fromMoment.clone().subtract(1, 'month');

//     setTimeout(function() {
//       assert.equal(i, 0);
//       range.removeEventListener('px-datetime-range-submitted', listener);
//       done();
//     }, 100);
//   });

//   test('event is fired when pressing enter', function() {
//     var i = 0;

//     var listener = function(evt) {
//       i++;
//     };

//     range.addEventListener('px-datetime-range-submitted', listener);

//     //do a change
//     range.fromMoment = range.fromMoment.clone().subtract(1, 'month');

//     fireKeyboardEvent(range, 'Enter');

//     assert.equal(i, 1);
//     range.removeEventListener('px-datetime-submitted', listener);
//   });

//   test('event is fired when clicking apply', function() {
//     var datetimeButtons = Polymer.dom(range.root).querySelectorAll('px-datetime-buttons'),
//         buttons = Polymer.dom(datetimeButtons).node[0].querySelectorAll('button'),//??,
//         i = 0;

//     var listener = function(evt) {
//       i++;
//     };

//     range.addEventListener('px-datetime-range-submitted', listener);

//     //do a change
//     range.fromMoment = range.fromMoment.clone().subtract(1, 'month');

//     buttons[1].click();

//     assert.equal(i, 1);
//     range.removeEventListener('px-datetime-submitted', listener);
//   });

//   test('moment is rolledback when clicking cancel', function() {
//     var datetimeButtons = Polymer.dom(range.root).querySelectorAll('px-datetime-buttons'),
//         buttons = Polymer.dom(datetimeButtons).node[0].querySelectorAll('button'),//??,
//         prevFromMoment = range.fromMoment.clone(),
//         i = 0;

//     //do a change
//     range.fromMoment = range.fromMoment.clone().subtract(1, 'month');

//     assert.notEqual(range.fromMoment.toISOString(), prevFromMoment.toISOString());

//     buttons[0].click();

//     assert.equal(range.fromMoment.toISOString(), prevFromMoment.toISOString());
//   });

//   test('moment is rolledback when pressing esc', function() {
//     var datetimeButtons = Polymer.dom(range.root).querySelectorAll('px-datetime-buttons'),
//         buttons = Polymer.dom(datetimeButtons).node[0].querySelectorAll('button'),//??,
//         prevFromMoment = range.fromMoment.clone();
//     //do a change
//     range.fromMoment = range.fromMoment.clone().subtract(1, 'month');

//     assert.notEqual(range.fromMoment.toISOString(), prevFromMoment.toISOString());

//     fireKeyboardEvent(range, 'Esc');

//     assert.equal(range.fromMoment.toISOString(), prevFromMoment.toISOString());
//   });

// });


// suite('validation', function() {

//   test('range wont allow range to be reversed', function(){
//     var range = fixture('range'),
//         fields = Polymer.dom(range.root).querySelectorAll('px-datetime-field'),
//         toEntries = Polymer.dom(fields[1].root).querySelectorAll('px-datetime-entry'),
//         todateCells = Polymer.dom(toEntries[0].root).querySelectorAll('px-datetime-entry-cell'),
//         i=0,
//         fireKeyboardEvent = function(elem, key){
//           var evt = new CustomEvent('keydown',{detail:{'key':key,'keyIdentifier':key}});
//            elem.dispatchEvent(evt);
//         };

//     var listener = function(evt) {
//       i++;
//     };

//     range.addEventListener('px-datetime-range-submitted', listener);

//     //to date should be after before date
//     fireKeyboardEvent(todateCells[0], '1');
//     fireKeyboardEvent(todateCells[0], '2');
//     fireKeyboardEvent(todateCells[0], '2');
//     fireKeyboardEvent(todateCells[0], '2');

//     setTimeout(function() {
//       assert.equal(i, 0);
//       assert.isFalse(range.isValid);
//       assert.isFalse(range._isRangeValid);
//       range.removeEventListener('px-datetime-range-submitted', listener);
//       done();
//     }, 100);
//   });
// });
