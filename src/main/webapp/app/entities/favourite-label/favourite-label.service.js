(function() {
    'use strict';
    angular
        .module('furyMusicApp')
        .factory('FavouriteLabel', FavouriteLabel);

    FavouriteLabel.$inject = ['$resource', 'DateUtils'];

    function FavouriteLabel ($resource, DateUtils) {
        var resourceUrl =  'api/favourite-labels/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertDateTimeFromServer(data.date);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
