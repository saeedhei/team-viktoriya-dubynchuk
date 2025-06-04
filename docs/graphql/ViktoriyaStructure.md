src/
├─ components/
│ ├─ Card/
│ │ ├─ pages/
│ │ │ ├─ CardPage.tsx # Page to manage/add cards
│ │ │ ├─ LearnPage.tsx # Page for learning mode
│ │ │ ├─ QuizPage.tsx # Page for quiz mode
│ │ ├─ CardPreview.tsx # Shows a card preview (read-only display)
│ │ ├─ CardFormModal.tsx # Modal wrapper for CardFormFields
│ │ ├─ CardFormFields.tsx # The form inputs & logic (without modal)
│ │ ├─ CardForm.tsx # Optional - can wrap CardFormModal or be
│ │ ├─ CardItem.tsx # Single card list item (summary view)
│ │ ├─ PaginatedFlashcards.tsx # Pagination + list of cards with CardItem
│ │ ├─ SearchBar.tsx # Search input component
│ │ ├─ cardFormUtils.ts # Helper functions & constants for form
│ │ ├─ services/
│ │ │ └─ cardService.ts # API calls
│ │ ├─ types/
│ │ │ └─ card.ts # Types/interfaces
| |  
| ├─ common
| | |
| | ├─Navbar.tsx
| |
| |
| ├─ Home
| | |
| | ├─ HomePage.tsx
