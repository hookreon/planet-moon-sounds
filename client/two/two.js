angular.module('two', ['ngMaterial'])

.controller('twoctrl', function($scope, namesave, $interval){
  $scope.title = 'Moon Explorer',
  angular.extend($scope, namesave);
  $scope.saveName = function(name) {
    namesave.saveName(name);
  };
  $scope.user;
  $scope.welcomeClick = function(e) {
    $scope.appNodes();
  };
})
.directive('moonbutton', function() {
	return {
    restrict: 'EA',
	  template:'<section><p class="mooninput">What\'s your name, Moon Explorer?</p><form ng-submit="saveName(newertitle)"><input value="newtitle" style="display: block; margin:0 auto 1em;" ng-model="newertitle"><button style="display: block;margin:0 auto;">Submit</button></form></section>'
	};
})
.directive('moonstart', function() {
  return {
    restrict: 'EA',
    templateUrl:'/two/moonstart.html'
  };
})
.directive('synthwall', function() {
  return {
    restrict: 'EA',
    transclude: true,
    templateUrl: '/two/synthwall.html', 
    link: function (scope, element, attrs) {
      var svg = new Walkway({
          selector: '#ps4',
          duration: 3500
      }).draw();

      var context, osciallator, gain, disotortion, originalYPos, originalFrequency,
        scaleFrequencies = [110, 123.47, 130.81, 146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50, 1174.66, 1318.51, 1396.91, 1567.98, 1760,110, 123.47, 130.81, 146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50, 1174.66, 1318.51, 1396.91, 1567.98, 1760],
        appNode = document.querySelector('.synth'),
        appWidth = appNode.offsetWidth * 2,
        appHeight = appNode.offsetHeight,
        mouseXpos = window.clientX,
        mouseYpos = window.clientY;

      var audioCtx = (window.AudioContext  || window.webkitAudioContext);

      if (audioCtx) {
        context = new audioCtx();
      } 

      appNode.addEventListener('mousedown', function(e) {
        mouseXpos = e.clientX;
        mouseYpos = e.clientY;
        originalYPos = mouseYpos;
        osciallator = context.createOscillator(); 
        osciallator.type = 'square';
        originalFrequency = scaleFrequencies[Math.floor((mouseXpos/appWidth) * scaleFrequencies.length)]; 
        osciallator.frequency.value = originalFrequency;
        osciallator.start();
        disotortion = context.createWaveShaper();  
        disotortion.curve = makeDistortionCurve(400);
        disotortion.oversample = '4x';
        myFilter = context.createBiquadFilter();
        gain = context.createGain();          
        gain.gain.value = 1;                  
        osciallator.connect(myFilter);
        // myFilter.type = 'lowpass';
        // myFilter.frequency.value = 440;
        myFilter.connect(disotortion);
        disotortion.connect(gain);          
        gain.connect(context.destination);   

        appNode.addEventListener('mousemove', function(e) {
          var distanceY = e.clientY - originalYPos;
          mouseXpos = e.clientX;
          appWidth = appNode.offsetWidth;
          gain.gain.value = mouseXpos/appWidth;
          osciallator.frequency.value = originalFrequency + distanceY;
        }, false); 
      }, false); 

      appNode.addEventListener('mouseup', function() {
        osciallator.stop();
        appNode.removeEventListener('mousemove');
      }, false); 

    function makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50,
          n_samples = 44100,
          curve = new Float32Array(n_samples),
          deg = Math.PI / 180,
          i = 0,
          x;
        for ( ; i < n_samples; ++i ) {
          x = i * 2 / n_samples - 1;
          curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
        }
        return curve;
    }
    return {
      appNodes: appNode.addEventListener,
      svg: svg
    };    
   }
  };
})
.factory('namesave', function() {
  var name = 'Moon Explorer';
  var getName = function() {
    return name;
  };
  var saveName = function(user){
    name = user;
  };
  return {
    getName: getName,
    saveName: saveName
  };
});


