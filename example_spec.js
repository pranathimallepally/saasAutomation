var login_page = require('./pages/login_page.js');
var manageusers_page = require('./pages/manageusers_page.js');
var manageadministrators_page = require('./pages/manageadministrators_page.js');
var reusable = require("./ReusableLib/Reusable.js");
var AppURL = require('./Environment.json');

describe('PDB EnterPrise', function() {

  beforeEach( async function(){
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
  

  xit('Verify Enterprise Admin Login', async function() {
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
    }finally{
      browser.close();
      browser.sleep(10000);
  }
  });

  it('Create User account in Manage Users', async function() {
    //await browser.get(AppURL.ENTERPRISEURL);
    //await browser.manage().timeouts().implicitlyWait(MAXWAITTIME);
    //await browser.waitForAngular();

    try {
      //login into the Application
      ///var blogin = await reusable.loginIntoApp("Enterprise");
      //console.log(blogin);
     // await browser.waitForAngular();
      
        browser.sleep(10000);
        browser.ignoreSynchronization = true;
        //await  element(by.css('a[title="Manage Users"]')).click();
        manageusers_page.clickManageuserButton();
        browser.sleep(5000);

     //await  element(by.xpath('/html/body/pdb-app/ngx-pages/ngx-sample-layout/nb-layout/div/div/div/div/div/nb-layout-column/ngx-tables/ngx-smart-table/nb-card/nb-card-header/div/div[2]/a[1]')).click();
     
     manageusers_page.clickAdduserLink();
     browser.sleep(5000);

     
     manageusers_page.enterFirstName('Venktest');
     manageusers_page.enterLastName("Venktest");
     manageusers_page.enterPrimaryEmail("Venktest@gmail.com");
     manageusers_page.enterPrimaryPhone("1234567890");
     browser.sleep(5000);

     manageusers_page.clickSubmitButton();
     browser.sleep(10000);
      

    
    } catch (error) {
      console.log(
        "Error while Create User account***" + error
      );
      expect(false).toBe(true);
      
    }
    finally{

      //browser.close();
      browser.restart();
    }
  });


  
  xit('Create Admin account in Manage Administrators', async function() {
    

    try {
     
      
        browser.sleep(10000);
        browser.ignoreSynchronization = true;
        manageadministrators_page.clickManageAdministratorsButton();
        browser.sleep(5000);

     
        manageadministrators_page.clickAddNewAdministratorLink();
        browser.sleep(5000);

     
        manageadministrators_page.enterAdminName('Venktest');
        manageadministrators_page.enterAdminEmail("Venktest@gmail.com");
        manageadministrators_page.enterAdminPhone("1234567890");
        manageadministrators_page.clickAdminGenerateOTPButton();
        browser.sleep(5000);

        manageadministrators_page.clickAdminSaveButton();
     browser.sleep(10000);
      

    
    } catch (error) {
      console.log(
        "Error while Create Admin account***" + error
      );
      expect(false).toBe(true);
    }
    finally{
      browser.close();
    }
  });

  xit('Login Verify Enterprise Admin ', async function() {

    

    await browser.driver.manage().window().maximize();
     //browser.ignoreSynchronization = true;
    await browser.get('https://dev-eea.pdbenterprise.com');
    await browser.manage().timeouts().implicitlyWait(90000);
    
    await browser.waitForAngular();
    console.log(await browser.getTitle());
    //browser.sleep(20000);
   //await element(by.id('input-email')).sendKeys("scasdsad");
   login_page.enterUserName('vvgkrishna.a@axiomio.com');
   //browser.sleep(10000);
    // login_page.clickSigninButton();
     //button[normalize-space(.)='Sign In']
     //await  element(by.xpath('//button[normalize-space(.)="Sign In"]')).click();
     login_page.clickSigninButton();

     //browser.sleep(10000);
     login_page.enterPassword('Welcome2018!');
     //browser.sleep(10000);
     login_page.enterOTP('123456');
     //browser.sleep(10000);

     login_page.clickSigninButton();
    
     var exp_text=await element(by.css('a[title="Enterprise Admin"]')).getText();
     console.log(exp_text);
    expect(exp_text).toEqual('Enterprise Admin');
     browser.sleep(5000);
     browser.ignoreSynchronization = true;
     await  element(by.css('a[title="Manage Users"]')).click();
     //await  element(by.xpath('/html/body/pdb-app/ngx-pages/ngx-sample-layout/nb-layout/div/div/div/nb-sidebar[1]/div/div/nb-menu/ul/li/ul/li[2]/a')).click();
     //console.log(exp_text);
     
     browser.sleep(7000);

     //button[normalize-space(.)='Add New User']
     clickAdduserLink();

     await  element(by.xpath('/html/body/pdb-app/ngx-pages/ngx-sample-layout/nb-layout/div/div/div/div/div/nb-layout-column/ngx-tables/ngx-smart-table/nb-card/nb-card-header/div/div[2]/a[1]')).click();
      

    
    });


});
