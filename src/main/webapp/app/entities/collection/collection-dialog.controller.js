(function() {
    'use strict';

    angular
        .module('furyMusicApp')
        .controller('CollectionDialogController', CollectionDialogController);

    CollectionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Collection', 'User', 'Song'];

    function CollectionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Collection, User, Song) {
        var vm = this;

        vm.collection = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();
        vm.songs = Song.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.collection.id !== null) {
                Collection.update(vm.collection, onSaveSuccess, onSaveError);
            } else {
                Collection.save(vm.collection, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('furyMusicApp:collectionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
