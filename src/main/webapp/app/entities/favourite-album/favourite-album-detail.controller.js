(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteAlbumDetailController', FavouriteAlbumDetailController);

    FavouriteAlbumDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'FavouriteAlbum', 'Album', 'User'];

    function FavouriteAlbumDetailController($scope, $rootScope, $stateParams, previousState, entity, FavouriteAlbum, Album, User) {
        var vm = this;

        vm.favouriteAlbum = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('furyMusicApp:favouriteAlbumUpdate', function(event, result) {
            vm.favouriteAlbum = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
