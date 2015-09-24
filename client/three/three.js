angular.module('board', ['ngMaterial', 'two'])

.controller('boardctrl', function($scope, soundfact, namesave){
  angular.extend($scope, soundfact);
  $scope.playsound;
  $scope.songList = ['jumpone.mp3', 'jumptwo.wav', 'timer.wav', 'coin.wav', 'explosion.mp3'];
  $scope.songListTwo = ['mover.mp3', 'snes.wav', 'dart.mp3', 'start.wav', 'robot.wav'];
  $scope.audList = [{id: 'snd1', src: 'jumpone.mp3'}, {id: 'snd2', src: 'jumptwo.wav'}, {id: 'snd3', src: 'timer.wav'}, {id: 'snd4', src: 'coin.wav'}, {id: 'snd5', src: 'explosion.mp3'},{id: 'snd6', src: 'mover.mp3'}, {id: 'snd7', src: 'snes.wav'}, {id: 'snd8', src: 'dart.mp3'}, {id: 'snd9', src: 'start.wav'}, {id: 'snd10', src: 'robot.wav'}];
  $scope.keysound;
  $scope.user;
  $scope.getName = function() {
    $scope.user = namesave.getName();
  };
  $scope.getName();
})
.directive('audioone', function(){
  return {
    restrict: 'EA',
    templateUrl: '/three/audioone.html'
  } ;
})
.directive('soundmaker', function(){
  return {
    restrict: 'EA',
    templateUrl: '/three/soundmaker.html'
  } ;
})
.directive('soundmakertwo', function(){
  return {
    restrict: 'EA',
    templateUrl: '/three/soundmakertwo.html'
  };
})
.factory('soundfact', function() {
   var keysound = $(document).keydown(function(e) {
    if (e.keyCode == 13) { 
       playsound('jumpone.mp3');
    }
    if (e.keyCode == 37) { 
       playsound('jumptwo.wav');
    }
    if (e.keyCode == 38) { 
       playsound('timer.wav');
    }
    if (e.keyCode == 39) { 
       playsound('coin.wav');
    }
    if (e.keyCode == 40) { 
       playsound('explosion.mp3');
    }
     if (e.keyCode == 16) { 
       playsound('mover.mp3');
    }
    if (e.keyCode == 17) { 
       playsound('snes.wav');
    }
    if (e.keyCode == 65) { 
       playsound('dart.mp3');
    }
    if (e.keyCode == 18) { 
       playsound('start.wav');
    }
    if (e.keyCode == 222) { 
       playsound('robot.wav');
    }

  }); 
  function playsound(i) {    
    var filepath='../sounds/' + i;
    console.log(filepath); //example
    var audio = new Audio();   
    audio.src = filepath;
    audio.controls = true;
    audio.autoplay = true;
  }
  return {
    playsound: playsound,
    keysound: keysound
  };
});