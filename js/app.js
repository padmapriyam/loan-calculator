/**
 * Created by sksakthivel on 30/06/2016.
 */
var app = angular.module("LoanCalcApp",[])

        .controller("LoanController",['$scope', function($scope){
            $scope.loanAmt = 10000;
            $scope.term = 5;
            $scope.intRate = 5;
            $scope.showAmort = false;

            $scope.calculate = function() {
                var monIntRate = $scope.intRate/1200;
                var termMonths = $scope.term * 12;
                console.log($scope.loanAmt);
                console.log($scope.term);
                var np = Math.pow((1+monIntRate),termMonths);
                $scope.monPayment = $scope.loanAmt * ((monIntRate * np)/(np-1));
                $scope.monPayment = Math.round($scope.monPayment * 100)/100;
                console.log($scope.monPayment);
                $scope.totPayment = $scope.monPayment * termMonths;
                $scope.totInt = $scope.totPayment - $scope.loanAmt;
                $scope.totInt = Math.round($scope.totInt * 100)/100;
            }

            $scope.showAmortSchedule = function() {
                $scope.showAmort = true;
                $scope.amortSch = [];

                var monIntRate = $scope.intRate/1200;
                var principal = $scope.loanAmt;
                var interest = 0;
                var count = 0;

                for(var i=$scope.loanAmt;i>=1;i-=monSch.prinPay){
                    var monSch = {
                        schNum: 0,
                        intPay: 0,
                        prinPay: 0,
                        remPrincipal: principal,
                        totInt: interest
                    };
                    monSch.schNum = count + 1;
                    monSch.intPay = monSch.remPrincipal  * monIntRate;
                    monSch.prinPay = $scope.monPayment - monSch.intPay;
                    monSch.remPrincipal-=monSch.prinPay;
                    monSch.totInt += monSch.intPay;
                    monSch.intPay = Math.round(monSch.intPay * 100)/100;
                    monSch.prinPay = Math.round(monSch.prinPay * 100)/100;
                    monSch.remPrincipal = Math.round(monSch.remPrincipal * 100)/100;
                    monSch.totInt = Math.round(monSch.totInt * 100)/100;
                    $scope.amortSch[count] = monSch;
                    principal = monSch.remPrincipal;
                    interest = monSch.totInt;
                    count++;
                }
            }

            $scope.closeAmortSchedule = function() {
                $scope.showAmort = false;
                $scope.amortSch = [];
            }
        }])


;

