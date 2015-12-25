'use strict';

(function() {
    angular.module('whatsMyGpaApp')
        .controller('MainController', function ($scope) {
            $scope.model = {
                course: '',
                gradeLetter: '',
                cachedCGPANum: 0
            };

            // A list of table members (i.e. model objects)
            $scope.tableMembers = [
                {
                    course: 'COMP 1405',
                    gradeLetter: 'A+',
                    cachedCGPANum: 12
                },
                {
                    course: 'COMP 1406',
                    gradeLetter: 'A',
                    cachedCGPANum: 11
                },
                {
                    course: 'COMP 2804',
                    gradeLetter: 'A',
                    cachedCGPANum: 11
                }
            ];

            $scope.addRow = function () {
                $scope.add({
                    course: $scope.course,
                    gradeLetter: $scope.gradeLetter,
                    cachedCGPANum: 0});
            };

            $scope.add = function (grade) {
                // Calc CGPA!
                grade.cachedCGPANum = {
                    'F': 0, 'D-': 1, 'D': 2, 'D+': 3, 'C-': 4,
                    'C': 5, 'C+': 6, 'B-': 7, 'B': 8, 'B+': 9,
                    'A-': 10, 'A': 11, 'A+': 12}[grade.gradeLetter];
                $scope.tableMembers.push(grade);
            };

            $scope.calculateCGPA = function () {
                return Math.floor($scope.tableMembers.map(function(grade) {
                                                                return grade.cachedCGPANum;
                                                            }).reduce(function (a, b) {
                                                                return a + b;
                                                            }) / $scope.tableMembers.length);
            };
        });

})();
