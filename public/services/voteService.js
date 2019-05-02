app.service('voteService', ['$http', '$cookieStore', function ($http, $cookieStore) {
    const VOTE_ENDPOINT   = '/api/vote';
    const VOTE_RANK_ENDPOINT   = '/api/vote/rank';
    const VOTE_NEW_ENDPOINT   = '/api/vote/create';
    var vote = {};

    vote.getAll = function() {
        return $http.get(VOTE_ENDPOINT).then(function(response, status) {
            if (response.data == null) return null;
            return response.data;
        });
    }

    vote.getVote = function(id) {
        return $http.get(VOTE_ENDPOINT+'/'+id).then(function(response, status) {
            if (response.data == null) return null;
            return response.data;
        });
    }

    vote.getVoteRank = function(id) {
        return $http.get(VOTE_RANK_ENDPOINT+'/'+id).then(function(response, status) {
            if (response.data == null) return null;
            return response.data;
        });
    }

    vote.create = function(voteObj) {
        return $http.post(VOTE_NEW_ENDPOINT, { vote: voteObj }).then(function(response, status) {
            // console.log(response);
            if (!response.data) return null;
            return response.data;
        });
    }

    return vote;
}]);