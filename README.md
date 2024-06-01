This project serves as a React learning playground. The idea is a shared blog/diary platform for a small, limited group of people.

## LOGIN - TEST USERS DATA

### Admin:

**email**: admin@storysharing.com, **password**: admin123#;

### Regular Accounts:

**email**: undefined@storysharing.com, **password**: undefined123#;

**email**: rainbowrider@storysharing.com, **password**: rainbowRider123#;

**email**: janedoe@storysharing.com, **password**: janeDoe123#;

_\*\*\* Since non-admin users can change their passwords via profile settings or the accounts might be deleted, access to those accounts could be lost. Use the admin account than. After resetting to test data, all accounts will be accessible again. (While it's technically possible to change the admin password, please refrain from doing so.)_

## REGISTRATION:

For testing purposes, email confirmation has been disabled.

## RESET TO TEST DATA

The reset functionality is intended for testing purposes only.

It takes a while as over 5mb of pictures data is being uploaded.

This project primarily uses the Supabase client for database operations. Since transactions cannot be managed at this level, more complex operations might occasionally fail. If an operation fails, simply retry.
