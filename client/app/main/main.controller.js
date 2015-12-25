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
            var items = window.localStorage.getItem('tableMembers');
            $scope.tableMembers = items ? JSON.parse(items) : [];

            $scope.addRow = function () {
                if ($scope.course && $scope.gradeLetter) {
                    $scope.add({
                        course: $scope.course,
                        gradeLetter: $scope.gradeLetter,
                        cachedCGPANum: 0
                    });
                    $scope.course = '';
                    $scope.gradeLetter = '';
                    window.localStorage.setItem('tableMembers', JSON.stringify($scope.tableMembers));
                }
            };

            $scope.removeRow = function (i) {
                $scope.tableMembers.splice(i, 1);
                window.localStorage.setItem('tableMembers', JSON.stringify($scope.tableMembers));
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
                if (this.tableMembers.length != 0) {
                    return ($scope.tableMembers.map(function (grade) {
                            return grade.cachedCGPANum;
                        }).reduce(function (a, b) {
                            return a + b;
                        }, 0) / $scope.tableMembers.length).toFixed(2);
                }
                else {
                    return 0;
                }
            };
        });

})();
