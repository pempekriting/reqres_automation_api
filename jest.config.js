/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  setupFiles: ["dotenv/config"],
  preset: 'ts-jest',
  testEnvironment: 'node',
  fakeTimers: {
    enableGlobally: true
  },
  reporters: [ 
    'default', 
    ['jest-junit', 
      {
        outputDirectory: `reports`
      }
    ],
    ['jest-html-reporters', 
      {
        publicPath: `reports`,
        filename: `results_test.html`,
        //openReport: true,
        includeConsoleLog: true,
        pageTitle: `Summary Functionality Test`,
        logoImgPath: `./resources/reqres_logo.png`
      }
    ],
  ]
};