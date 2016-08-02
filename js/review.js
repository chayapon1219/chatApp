(function () {
    'use strict';
     
    var app = angular.module('application', []);
    app.controller('reviewController', function ($scope) {
        $scope.datas =[];       // เก็บข้อมูลทั้งหมดที่ถูกส่งจากฟอร์ม
        $scope.data ={};        // ข้อมูลที่ผูกกับ form
        // ฟังก์ชั่น เพิ่มข้อมูลลง datas
        $scope.addData = function (datas) { 
            datas.push($scope.data);
            $scope.data = {};
        };
    });
     
})();