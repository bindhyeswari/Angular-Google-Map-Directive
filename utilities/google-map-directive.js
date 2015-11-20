/**
 * Created by bindhyeswarimishra on 11/19/15.
 */

// add the script to the directive map in the compile phase

var utilitiesApp = angular.module('gllUtilities', []);

utilitiesApp.directive('map', function ($q) {

    // directive promise to be resolved after the loading of google maps

    return {
        compile: function (element) {

            // create an element,
            // write promises to work with google maps
            // write a promise to work with geolocation

            element.append(angular.element('<button>Click to check status</button>'));
            var $div = angular.element('<div class="google-map">');

            var map_load_deferred = $q.defer();

            window.init = function() {
                console.log('google maps api is loaded ... ');
                map = new google.maps.Map($div[0], {
                    center: {lat: 10, lng: 100},
                    zoom: 14
                });
                map_load_deferred.resolve(true);
            };

            element.append($div);

            // load the script

            var script = angular.element('<script>').attr('src', 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=init');
            angular.element(document.head).append(script);

            return {
                pre: function () {

                },
                post: function (scope, element) {
                        console.log('Map loading status is ... ', map_load_deferred.promise.$$state.status);
                    // before performing any actions we need to know if the map is loaded
                    element.children('button').eq(0).on('click', function () {
                        console.log('Map loading status is ... ', map_load_deferred.promise.$$state.status);
                    });

                    map_load_deferred.promise.then(function () {
                        console.log('promise says: map is loaded');
                    });
                }
            };
        }
    };
});