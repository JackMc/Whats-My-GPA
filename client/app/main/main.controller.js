'use strict';

(function() {
    angular.module('whatsMyGpaApp')
        .controller('MainController', function ($scope) {
            $scope.model = {
                course: "",
                grade_letter: "",
                cached_cgpa_num: 0
            };

            // A list of table members (i.e. model objects)
            $scope.tableMembers = [
                {
                    course: "COMP 1405",
                    grade_letter: "A+",
                    cached_cgpa_num: 12
                },
                {
                    course: "COMP 1406",
                    grade_letter: "A",
                    cached_cgpa_num: 11
                },
                {
                    course: "COMP 2804",
                    grade_letter: "A",
                    cached_cgpa_num: 11
                }
            ];

            $scope.addRow = function () {
                $scope.add({
                    course: $scope.course,
                    grade_letter: $scope.grade_letter,
                    cached_cgpa_num: 0});
            };

            $scope.add = function (grade) {
                // Calc CGPA!
                grade.cached_cgpa_num = {
                    "F": 0, "D-": 1, "D": 2, "D+": 3, "C-": 4,
                    "C": 5, "C+": 6, "B-": 7, "B": 8, "B+": 9,
                    "A-": 10, "A": 11, "A+": 12}[grade.grade_letter];
                $scope.tableMembers.push(grade);
            };

            $scope.calculateCGPA = function () {
                return Math.floor($scope.tableMembers.map(function(grade) {
                                                                return grade.cached_cgpa_num;
                                                            }).reduce(function (a, b) {
                                                                return a + b;
                                                            }) / $scope.tableMembers.length);
            };
        });

})();
