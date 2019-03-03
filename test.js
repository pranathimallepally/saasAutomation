describe('PDB EnterPrise Manage Users Module', function () {

  var login_page = require('./pages/login_page.js');
var manageusers_page = require('./pages/manageusers_page.js');
var manageadministrators_page = require('./pages/manageadministrators_page.js');
var reusable = require("./ReusableLib/Reusable.js");
var AppURL = require('./Environment.json');
var expected_result = require('./expectedresult.json');
var test_data = require("./TestData/TestData_manageusers.json");
/*
  beforeAll(async function () {
    //browser.sleep(50000);
    await global.browser.manage().window().maximize();
    await browser.get(AppURL.ENTERPRISEURL);
    await browser.manage().timeouts().implicitlyWait(MAXWAITTIME);
    await browser.waitForAngular();

    try {
      //login into the Application
      var blogin = await reusable.loginIntoApp("Enterprise");
      console.log(blogin);
      // await browser.waitForAngular();
      if (blogin == true) {
      } else {
        throw "Not able to login";
      }


    } catch (error) {
      console.log(
        "Error while Login ***" + error
      );
      expect(false).toBe(true);
    }
  });
  

  afterEach(async function () {

    await browser.refresh();
    browser.sleep(10000);
    await login_page.clickUsername_Link();
    browser.sleep(5000);

    //await login_page.clickUser_logout();
  });
  */

  it('Verify ManageUsers Labels', async function () {

   /*
    var Excel = require('exceljs');
    var wrkbook = new Excel.Workbook();

    var worksheet2 = wrkbook.addWorksheet('My Sheet');

		// set the column headers
       

		// add rows
        worksheet2.addRow(15, 'karthiq',"Senior test engg");
		//worksheet2.addRow({id: 2, name: 'Joe', desig: "programmer"});
		//write the file to local system
    wrkbook.xlsx.writeFile('./TestData/headerExcel.xlsx');

    await wrkbook.xlsx.readFile('./TestData/auto.xlsx').then(async function () {
      var worksheet = await wrkbook.getWorksheet('Sheet1');
      var totalrows = worksheet.rowCount;
      var totalcolumns = worksheet.columnCount;
      console.log(totalrows);
      console.log(totalcolumns);
      for(let i=1; i <= totalrows; i++){

        
        for(let j=1; j <= totalcolumns; j++){
          let cellValue = worksheet.getRow(i).getCell(j).toString();
				  console.log("Column '"+j+"' value from the row '"+i+"' : "+ cellValue);

        }

				
      }
      
      
      var rowObject = await  worksheet.getRow(2);
      var scellvalue = await rowObject.getCell(3);
      console.log(scellvalue.value);
    });

   */


    
    const $ = require('cheerio');
    const rp = require('request-promise');
    var speakeasy = require('speakeasy');

    await global.browser.manage().window().maximize();
    browser.ignoreSynchronization = true;
    await browser.get("https://datacops.dev.pdbenterprise.com/#/reset-pwd");
    var parentGUID = await browser.getWindowHandle();
    console.log(parentGUID);
    browser.sleep(10000);
    await browser.element(by.id('input-email')).sendKeys('kevin001@gmail.com');
    await browser.element(by.id('input-otp')).sendKeys('sWMtV&yXL&ruG&Gw');
    browser.sleep(5000);
    await browser.element(by.buttonText('Reset Password')).click();
   //await browser.element(by.buttonText('Activate Account')).click();
    browser.sleep(10000);

    //var imagedata= await browser.element(by.xpath('/html/body/pdb-app/app-account-activation/nb-layout/div/div/div/div/div/nb-layout-column/nb-card/nb-card-body/div/div[2]/div[1]/div/div[1]/form/div/div[3]/div/img')).getAttribute('src');
    var imagedata= await browser.element(by.xpath('/html/body/pdb-app/app-account-activation/nb-layout/div/div/div/div/div/nb-layout-column/nb-card/nb-card-body/div/div[2]/div[1]/div[1]/form/div/div[3]/div/img')).getAttribute('src');
    
    //console.log(imagedata);
    //await browser.actions().sendKeys(protractor.Keys.CONTROL + "t").perform();
    browser.driver.executeScript("(window.open('https://zxing.org/w/decode.jspx'))");

    browser.getAllWindowHandles().then(async function (allGUID) {
      // print the title of th epage
      console.log("Page title before Switching : " + browser.getTitle());
      console.log("Total Windows : " + allGUID.length);

      for (let guid of allGUID) {
        // one enter into if blobk if the GUID is not equal to parent window's GUID
        if (guid != parentGUID) {
          console.log(guid);
          // switch to the guid
          browser.switchTo().window(guid);

          browser.switchTo().window(guid);
          await browser.element(by.css("input[name='u']")).sendKeys(imagedata);
          await browser.sleep(5000);
          await  browser.element(by.xpath('/html/body/div/table[2]/tbody/tr[1]/td[3]/input')).click();
          await browser.sleep(5000);
          var str = await browser.element(by.xpath('/html/body/div/table/tbody/tr[1]/td[2]/pre')).getText();
          await browser.sleep(5000);
          console.log(str);
         /* rp("https://zxing.org/w/decode.jspx")
      .then(async function(html){
        */
          var start = str.indexOf("=");
          var end = str.indexOf("&");
          var keysecret = str.slice(start + 1, end);
          console.log(keysecret);

          browser.sleep(10000);
      await browser.switchTo().window(parentGUID);
    await browser.element(by.id('input-password')).sendKeys('Welcome2018!');
    await browser.element(by.id('input-cpassword')).sendKeys('Welcome2018!');

    var secret = keysecret;

    var token1 = speakeasy.totp({
      secret: secret,
      encoding: 'base32'
  });
  console.log(token1);
  await browser.element(by.id('input-token1')).sendKeys(token1);
  await browser.sleep(31000);
  var token2 = speakeasy.totp({
    secret: secret,
    encoding: 'base32'
});
console.log(token2);
  await browser.element(by.id('input-token2')).sendKeys(token2);
  await browser.sleep(1000);
  await browser.element(by.buttonText('Activate')).click();
  await browser.sleep(10000);

     // });
      
          // break the loop
          break;
        }
      }
      
      //browser.close();

    });
    
  
  

    /*
            const $ = require('cheerio');
    const rp = require('request-promise');
    const url = 'https://zxing.org/w/decode?u=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAVkAAAFZAQAAAAAaiWF2AAAEyElEQVR4nO1aQa6jMAx1xYJlj8BN6MUqgcTF6E1yBJYsEB6%2F9wK0%2BhppFjMLj8oCtc1LpdiO%2FfwS8z9%2FRvuCv%2BAv%2BB%2BAFzO7xat1n3y9LY3bA2PzfexiYCjtbBxNCx7cX76ZPZZn1%2FrSFLy8BXi9uZf2FVMzg5%2BGr2UFOGywwQZP42s1w%2BhiXXawlr8Zl%2B%2BvOi3AMfe%2FAPvWxcBoYZKIZ7PB1wdGEcqeHcx4HjUjfsML%2B3fH3PiDzn8EfzIwM9ITXv3N60f6ygU%2BCkbE8%2BTKsQ7%2FzrFXfQ%2FHtz8KUDLwkYLo2tmGgngu4W7HJ%2BsisqfD3RnBsXIuVRv2pqAOu%2FSwBqN9R97NDCYrUOyu%2Fd19hRHCGiykTXHYJTMY6TWiOAYQxQFBAJfDGg3sMhTPC4Z%2FsTmxYcXhYvn8rSk0k%2BNTmxhMX2L5Ec9YuYvH7gZPG%2BL5fu3uhGByOPG68Gqs3FkqyfUQ45qWGIx8uh%2BZFcsvIOW29vrkinbPCw7XRqKdCjlrtFVoOGADcoEZDK9X5UwL5lJJwOlpUXGk4aG2kRHPV%2FrKB46%2BERmpC083zuzDyrkC3CLa14%2BUmw%2BMtqpS8Q0DkXIRxc4MDGOwcrZ5wVQ1IorZ74en6eQNDeWAyhk72ZB8M4MLMpIx24oLgMg5pnGvVoMlBkc7HGVRFBbZ1jlXmkf83FbHZwWjaD7Qf4AVoN%2BPrSv1zTr8S0F4Zwa7GAAFDXG4mAaGd2ccDLCGn%2FGcEAw1Cq9IPIO6jmBBG9NSdff%2BphUkBONh8Qe7abFXkYIc3XHsXyXfsUsMBu2hf1%2FiPvi0mNISOKvTTJnBjQQN8hzp%2FNAYFdnn45nBYAVDIe2B7k2xH4WUz1RH84KxJV%2Bkb5KkGichqL0VtLnXG%2B1JCr6WD0oHuip6XnGf1sgGBpFjPPeSpIYaz8xIqpxWVbqkYKtKW%2B2TUVggaEBOpfBBnT8z%2BIk%2BijPAeGAIxPNKUt5rEw8XR8oHRmNcmeqG0ZOUR58snf%2FNGinBU%2BQhDKC6sI%2BCBmAgd4hsHitexDUhWKE8dhylnghC0EmMoyp%2Bc%2FfEYNYUgKNFBmcdu1ZKx73uX7PrICMjWDLp0%2Bq1BWk3DeXFKqLObxJcSnDnLJA8TDR1x6iS%2BpdBJMHzgp0dBrIPwL1aRvRbx3UTFZu8YNQUCPt1w4YhKC%2BSJJCef%2FRWGcHUpXjsRMejXkrn128QH6eTFSQEU15Een24KwW1zMDkAnNQA52l5gWr65AkJemUcw8JbirMUpnB19nTUzWFdiE950kwOIMlBuuglPpG5XW6vjdzw5Kj3%2F2M54RgXtCTxE9Bg2c2Vd2349w0Mxi6VH%2FeZPOD9lDPITNfea6RGLxRNe20ZBiiit9Hi8z9mxjMfBo%2B573SKuVIDZgkL9rtLTZSgu2s%2Bx0PEylT8ZiNBEiqVV4wH%2FIcQu4SFTFKLjBJv0oM5uE9si02LPeq1LcZVnlIFf%2B82JYNPEixOfTEKirqOrQk%2FjedPyNYd9Ql2zjv60ljBEnoFc9vjVhSMDr%2FqqRORbdJd21TcgZPD%2BYhjQqLrrEXvnSOiDrTJgYP9Qb7LiI3mlqPWzUTD25Oa2QEMyNNR08MNgee47poQ0Msl6ScEPzHzxf8BX%2FBfx%2F8Cx7%2BVXl4baUcAAAAAElFTkSuQmCC';
    
    rp(url)
      .then(function(html){
          //const root = parse(html);
         // console.log(root.firstChild.structure);
        //success!
        // console.log($('#result',html).find('pre').text());
        // console.log($('#result', html).text());
        let str = $('#result',html).find('pre').text();
        var start = str.indexOf("=");
        var end = str.indexOf("&");
        var secret = str.slice(start+1, end);
        console.log(secret);
    
        //$(this).closest('table').children('tr:first');
      })
      .catch(function(err){
        //handle error
      });
    
      //

    browser.sleep(10000);
    */

  });


  it('Verify ManageUser Account deatils', async function () {


    try {

      //browser.sleep(10000);
      browser.ignoreSynchronization = true;
      await manageusers_page.clickManageuserButton();
      //browser.sleep(5000);

     

    
      var path = require("path");
   
      await browser.element(by.xpath('/html/body/pdb-app/ngx-pages/ngx-sample-layout/nb-layout/div/div/div/div/div/nb-layout-column/ngx-tables/ngx-smart-table/nb-card/nb-card-header/div/div[2]/a[2]')).click();
       browser.sleep(7000); 

       var text1 = await browser.element(by.xpath('/html/body/pdb-app/ngx-pages/ngx-sample-layout/nb-layout/div/div/div/div/div/nb-layout-column/ngx-tables/ngx-smart-table/nb-card/nb-card-body/div[3]/div')).getText();
      console.log(text1);
      //await expect(expected_result.ex_user_import_content_note).toBe(text1);

       var text2 = await browser.element(by.xpath('/html/body/pdb-app/ngx-pages/ngx-sample-layout/nb-layout/div/div/div/div/div/nb-layout-column/ngx-tables/ngx-smart-table/nb-card/nb-card-header/div/div/h2')).getText();
       console.log(text2);

       var text3 = await browser.element(by.xpath('/html/body/pdb-app/ngx-pages/ngx-sample-layout/nb-layout/div/div/div/div/div/nb-layout-column/ngx-tables/ngx-smart-table/nb-card/nb-card-body/div[1]/div')).getText();
       console.log(text3);
       
       var filePath = "C:/Users/pdb12.DESKTOP-37O9JVG/AppData/Roaming/npm/node_modules/protractor/example/TestData/importtest.csv";
       var fpath = path.resolve(__dirname,filePath);
       console.log(fpath);
       //var remote = require('selenium-webdriver/remote');
       //browser.setFileDetector(new remote.FileDetector());
       //await browser.element(by.buttonText('Browse')).click();
   
       await browser.element(by.xpath('/html/body/pdb-app/ngx-pages/ngx-sample-layout/nb-layout/div/div/div/div/div/nb-layout-column/ngx-tables/ngx-smart-table/nb-card/nb-card-body/div[2]/div[2]/input')).sendKeys(fpath);
   
       browser.sleep(30000);

       

        await browser.manage().timeouts().implicitlyWait(MAXWAITTIME);
        //Start Validation for Searching
        //await reusable.performSearchWithColumnValue("SNo.");
        await reusable.performSearchWithColumnValue("First Name");
        await reusable.performSearchWithColumnValue("Last Name");
        await reusable.performSearchWithColumnValue("Email");
        await reusable.performSearchWithColumnValue("Phone");
      
      




    } catch (error) {
      console.log(
        "Error while Manage User account***" + error
      );
      expect(false).toBe(true);

    }

  });


});