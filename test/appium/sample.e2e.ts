describe('DDSAForm Android App', () => {
  it('should open app and find a UI element', async () => {
    // Replace '~form-root' with your element's accessibility id
    const el = await $('~form-root');
    await expect(el).toBeDisplayed();
  });
});
