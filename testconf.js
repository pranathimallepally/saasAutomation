// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
 
  /*
  capabilities: {
    'browserName': 'chrome'
  },
  
  */
  multiCapabilities: [
     {
    'browserName': 'chrome',
    args:['--disable-xss-auditor','--disable-web-security']
  }],

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine2',


  plugins: [{
    package: 'protractor-screenshoter-plugin',
    screenshotPath: './REPORTS/e2e',
    screenshotOnExpect: 'failure+success',
    screenshotOnSpec: true,
    withLogs: true,
    writeReportFreq: 'asap',
    imageToAscii: 'none',
    clearFoldersBeforeTest: true
  }],

  

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['test.js'],
  //specs: ['example_spec.js'],
 // SELENIUM_PROMISE_MANAGER: false,
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 99999999,
      showColors: true
  },

  onPrepare: async function() {
   
    minwait = 30000;
    MAXWAITTIME = 70000;
    Jasmine2HtmlReporter = require("protractor-jasmine2-html-reporter");
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: "./HTMLreports/",
        screenshotsFolder: "./images/",
        consolidate: true,
        consolidateAll: true,
        takeScreenshotsOnlyOnFailures: true
      })
    );
    // returning the promise makes protractor wait for the reporter config before executing tests
    return global.browser.getProcessedConfig().then(function(config) {
        //it is ok to be empty
    });
}




};
