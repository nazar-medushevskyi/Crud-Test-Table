export const getErrorText = (text: string): string | null => {
  const trimmedValue = text.trim();

  if (!trimmedValue) {
    return 'Input should be filled';
  }

  if (trimmedValue.length < 3) {
    return 'Todo should contain at least 3 characters';
  }

  if (!isNaN(+text)) {
    return 'Should be in text format (e.g., pick up at 12:34, pay 54, etc..)';
  }

  return null;
};

export const dismissBackdrop = (id: string) => {
    const dismissBtn = document.createElement('button')
    dismissBtn.setAttribute('data-dismiss', 'modal')

    dismissBtn.type = 'button'

    document.getElementById(id)?.append(dismissBtn) 

    dismissBtn.click()

    dismissBtn.remove()
  }
