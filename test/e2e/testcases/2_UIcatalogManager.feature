@uicatalogmanager
Feature: UICatalogManager

@flow
Scenario: Check the UI Catalog is displayed
  Given UICatalog is displayed
  Then I check control named "sap_norman_controls_HotspotImage" exists
  
  
@flow
Scenario: Select the control to copy from root to custom catalog
	Given I select control named "sap_norman_controls_HotspotImage" 
	Then I select properties
	Then I click on copy control button
	Then I click on the Copy button


@flow
Scenario: Select the custom catalog section
	Given UICatalog is displayed
	Then I select custom dropdown option

@flow
Scenario: Delete Control
	Given UICatalog is displayed 
	Then I click on delete control button
	Then I click on the Delete button

@flow
Scenario: Download Catalog
	Given I select custom dropdown option
	Then I click on Download Custom Catalog Button 

@flow
Scenario: Upload custom catalog section
	Given UICatalog is displayed
	Then I select Upload custom catalog option

	