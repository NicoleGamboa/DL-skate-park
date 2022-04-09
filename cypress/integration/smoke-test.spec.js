describe('User account flow', () => {
    it('should create a new user', () => {
        cy.visit('/registro');
        cy.get('input[name="email"]').type('jhon.doe@mail.com');
        cy.get('input[name="name"]').type('Jhon Doe');
        cy.get('input[name="password"]').type('secret');
        cy.get('input[name="password_confirm"]').type('secret');
        cy.get('input[name="years_experience"]').type('5');
        cy.get('input[name="specialty"]').type('Ollie');
        cy.get('input[name="profile_photo"]').attachFile('test-image.png');
        cy.get('button[type="submit"]').click();

        // redirecciona
        cy.location('pathname').should('eq', '/login')
    });

    it('should login to account', () => {
        cy.visit('/login');
        cy.get('input[name="email"]').type('jhon.doe@mail.com');
        cy.get('input[name="password"]').type('secret');
        cy.get('button[type="submit"]').click();

        // redirecciona
        cy.location('pathname').should('eq', '/datos')
    });

    it('should request user data', () => {
        cy.get('input[name="email"]').should('have.value', 'jhon.doe@mail.com');
        cy.get('input[name="name"]').should('have.value', 'Jhon Doe');
        cy.get('input[name="years_experience"]').should('have.value', '5');
        cy.get('input[name="specialty"]').should('have.value', 'Ollie');
    });
})