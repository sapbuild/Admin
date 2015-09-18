@admin
Feature: Admin


  @flow
  Scenario: Login with Valid Credentials in the Admin
    Given I am on the admin login page
    When I enter admin credentials
    Then I am logged in in the Admin

  @flow
  Scenario: Users are displayed
    Given I am in the Admin
    When I navigate to next page
    Then Users are displayed

  @flow
  Scenario: I search for user using 'Pit'
    Given I am in the Admin
    When I enter 'Pit' in user research
    Then 'Pit Sampras' user is displayed
    Then 'Andre Agazzi' user is not displayed
    Then '1' users are displayed

  Scenario: I search for user using 'dddd'
    Given I am in the Admin
    When I enter 'dddd' in user research
    Then No user is displayed
    Then '0' users are displayed

  Scenario: I switch to user details mode and change Pit Sampras role to Standard then to Guest
    Given I am in the Admin
    When I switch to user details

    When I click on user named 'Pit Sampras'
    Then Set Role Dialog is displayed
    When I change his role to standard
    Then User 'Pit Sampras' has role 'standard'

    When I click on user named 'Pit Sampras'
    Then Set Role Dialog is displayed
    When I change his role to guest
    Then User 'Pit Sampras' has role 'guest'



  @flow
  Scenario: I'm logged in and I click on UI Catalog button
    Given I am in the Admin
    When I open UI Catalog
    Then UICatalog is displayed




