(function () {

  var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var app = angular.module('app', []);

  app.controller('MainCtrl', [
    '$scope',
    function ($scope) {

      $scope.passwords = [];
      $scope.hasSymbols = true;
      $scope.symbols = '!@#$%^&*().,<>';
      $scope.alphaLower = true;
      $scope.alphaUpper = true;
      $scope.numbers = true;
      $scope.spaces = true;
      $scope.noRepeat = true;
      $scope.min = 30;
      $scope.max = 30;
      $scope.passwordCount = 5;

      $scope.generate = function () {

        var options = '',
            password,
            passwordCount = parseInt($scope.passwordCount, 10),
            min = parseInt($scope.min, 10),
            max = parseInt($scope.max, 10),
            passwordLength,
            passwordChar,
            previousPasswordChar,
            i,
            j;

        if ($scope.alphaLower) {
          options += 'abcdefghijklmnopqrstuvwxyz';
        }
        if ($scope.alphaUpper) {
          options += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if ($scope.numbers) {
          options += '0123456789';
        }
        if ($scope.spaces) {
          options += ' ';
        }
        if ($scope.hasSymbols && $scope.symbols) {
          options += $scope.symbols;
        }

        $scope.passwords = [];
        if (options && options.length) {
          for (i = 0; i < passwordCount; i++) {
            passwordLength = randomInt(min, max);
            password = '';
            for (j = 0; j < passwordLength; j++) {
              do {
                passwordChar = options[randomInt(0, options.length - 1)];
              } while ($scope.noRepeat && passwordChar === previousPasswordChar);
              password += passwordChar;
              previousPasswordChar = passwordChar;
            }
            $scope.passwords.push(password);
          }
        }

      };

      $scope.copy = function (password) {

        window.prompt('Copy to clipboard: Ctrl+C, Enter', password)

      };

    }
  ]);

})();
