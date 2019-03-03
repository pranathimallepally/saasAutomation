// An example configuration file.
var nodemailer = require('nodemailer');
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
    args:['--disable-xss-auditor','--disable-web-security'],
    //'shardTestFiles': true,
     // 'maxInstances': 4,
      //chromeOptions: {
        //args: ["--headless"]
    //}
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
  //specs: ['./spec/spec_manageuser.js'],
  specs: [
    './spec/manageAdministratorSpec.js',
  //'./spec/spec_manageuser.js',
  //'./spec/manageAccountSpec.js',
 // './spec/billingProfileSpec.js',
  //'./spec/invoiceHistorySpec.js',
  //'./spec/manageSupportSpec.js',
  //'./spec/accountActivationSpec.js',
],
  //,'./spec/spec_manageuser.js','./spec/spec_login.js'
 // SELENIUM_PROMISE_MANAGER: false,
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 99999999,
      showColors: true
  },

  onPrepare: async function() {
   
    minwait = 30000;
    MAXWAITTIME = 70000;
    /*Jasmine2HtmlReporter = require("protractor-jasmine2-html-reporter");
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: "./HTMLreports/",
        screenshotsFolder: "./images/",
        consolidate: true,
        consolidateAll: true,
        takeScreenshotsOnlyOnFailures: true
      })
    );*/
    // returning the promise makes protractor wait for the reporter config before executing tests
    return global.browser.getProcessedConfig().then(function(config) {
        //it is ok to be empty
    });
},

/*onComplete: function() {
  return new Promise(function (fulfill, reject){
      var transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // use SSL
          auth: {
              user: 'pdb1200.one@gmail.com',
              pass: 'Welcome2018!'
          }
      });
      var mailOptions = {
          from: '"TestMail" <pdb1200.one@gmail.com>', // sender address (who sends)
          to: 'rajuavvgk@gmail.com', // list of receivers (who receives)
          subject: 'Hello through conf', // Subject line
          text: 'Hello world ', // plaintext body
          html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js', // html body
  };
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
		response.send(err);
    } else {
        console.log("Message sent: " + info.response);
		response.send(info);
    }
});
  });
}*/




};
