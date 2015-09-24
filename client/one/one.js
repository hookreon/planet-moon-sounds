angular.module('map', ['ngMaterial', 'two'])

.controller('mapctrl', function($scope, namesave){
  $scope.user;
  $scope.getName = function() {
    $scope.user = namesave.getName();
  };
  $scope.getName();
})
.directive('moonsound', function() {
	return {
	  restrict:'EA',
	  template: '<md-button class="cFab" aria-label="button" ng-click="cClick.doClick()"></md-button>'
	};
})
.directive('audioone', function(){
  return {
  	restrict: 'EA',
  	templateUrl: '/three/audioone.html'
  };
})
.directive('soundmap', function() {
  return {
    restrict: 'EA',
    transclude: true,
    templateUrl: 'one/soundmap.html',
    link: function() {
      window.$ = function(selector) {
        return document.querySelector(selector);
      };
      window.$$ = function(selector) {
        var items   = {};
        var results = Array.prototype.slice.call(document.querySelectorAll(selector));              
        var length  = results.length;
        for (var i = 0 ; i < length; i++) {
            items[i] = results[i];  
        }
        items.length = length;        
        items.splice = [].splice();   
        
        items.each = function(callback) {
            for (var i = 0 ; i < length; i++) {
                callback.call(items[i]);
            }
        }
        items.on = function (event, fn) {
            []['forEach'].call(this, function (el) {
                el.on(event, fn);
            });
            return this;
        };
        return items;
      };
      Element.prototype.on = Element.prototype.addEventListener;
      Element.prototype.trigger = function (type, data) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(type, true, true);
        event.data = data || {};
        event.eventName = type;
        event.target = this;
        this.dispatchEvent(event);
        return this;
      };
      var Sequencer = function () {
        var that = this;
        that.looping = false;
        that.beat = 0;
        that.tempo = 120;
        that.steps = 16;
        that.draw = function () {
            var table = '';
            $$('audio').each(function () {
                this.load();
                this.play();
                this.pause();
                table += '<tr class="' + this.id + '">';
                table += '<td>' + this.id + '</td>';
                for (var i = 0; i < that.steps; i++) {
                    table += '<td class="beat col' + i + '">&nbsp;</td>';
                }
                table += '</tr>';
            });
            $('table').innerHTML = table;
        };
        that.clean = function () {
            $$('.hit').each(function () {
                this.classList.remove('hit');
            });
        };
        that.loop = function () {
            if (!that.looping) {
                return;
            }
            that.beat = (that.beat + 1) % that.steps;
            that.clean();
            $$('audio').each(function () {
                var hit = $('table tr.' + this.id + ' td.col' + that.beat + '.on');
                if (hit) {
                    hit.classList.add('hit');
                    this.currentTime = 0;
                    this.play();
                }
            });
            that.looping = setTimeout(function () { that.loop(); }, 60000 / that.tempo / 4);
        };
        that.bind = function () {
            $$('.beat').on('click', function () {
                this.classList.toggle('on');
            });
            $('#play').on('click', function () {
                if (that.looping) {
                    return;
                }
                that.looping = setTimeout(function () { that.loop(); }, 60000 / that.tempo / 4);
            })
            $('#pause').on('click', function () {
                clearTimeout(that.looping);
                that.looping = false;
            })
        };
      };
      var instance = new Sequencer();
      instance.draw();
      instance.bind();
    }
  };
});

