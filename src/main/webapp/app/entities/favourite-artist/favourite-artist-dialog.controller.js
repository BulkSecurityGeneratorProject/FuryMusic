(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('FavouriteArtistDialogController', FavouriteArtistDialogController);

    FavouriteArtistDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'FavouriteArtist', 'Artist', 'User'];

    function FavouriteArtistDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, FavouriteArtist, Artist, User) {
        var vm = this;

        vm.favouriteArtist = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.artists = Artist.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.favouriteArtist.id !== null) {
                FavouriteArtist.update(vm.favouriteArtist, onSaveSuccess, onSaveError);
            } else {
                FavouriteArtist.save(vm.favouriteArtist, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:favouriteArtistUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.date = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
