import * as types from "../actions/types";

const initState = {
  categories: [
    {
      id: "1",
      name: "vegetables",
      words: [
        {
          id: "11",
          origin: "cabbage",
          translation: "капуста",
          isLearnt: false
        },
        {
          id: "12",
          origin: "cucumber",
          translation: "огурец",
          isLearnt: true
        },
        {
          id: "13",
          origin: "pumpkin",
          translation: "тыква",
          isLearnt: false
        },
        {
          id: "14",
          origin: "radish",
          translation: "редис",
          isLearnt: false
        },
        {
          id: "15",
          origin: "zucchini",
          translation: "кабачок мелких сортов",
          isLearnt: false
        },
        {
          id: "16",
          origin: "tomato",
          translation: "помидор",
          isLearnt: true
        },
        {
          id: "17",
          origin: "potato",
          translation: "картофель",
          isLearnt: false
        },
        {
          id: "18",
          origin: "onion",
          translation: "лук",
          isLearnt: true
        },
        {
          id: "19",
          origin: "carrot",
          translation: "морковь",
          isLearnt: false
        },
        {
          id: "110",
          origin: "beetroot",
          translation: "свекла",
          isLearnt: false
        },
        {
          id: "111",
          origin: "corn",
          translation: "кукуруза",
          isLearnt: false
        },
        {
          id: "112",
          origin: "garlic",
          translation: "чеснок",
          isLearnt: false
        }
      ]
    },
    {
      id: "2",
      name: "at hotel",
      words: [
        {
          id: "21",
          origin: "available",
          translation: "доступный",
          isLearnt: false
        },
        {
          id: "22",
          origin: "in cash",
          translation: "наличными",
          isLearnt: true
        },
        {
          id: "23",
          origin: "luggage",
          translation: "багаж",
          isLearnt: false
        },
        {
          id: "24",
          origin: "discount",
          translation: "скидка",
          isLearnt: false
        },
        {
          id: "25",
          origin: "complaint",
          translation: "жалоба",
          isLearnt: false
        },
        {
          id: "26",
          origin: "payment",
          translation: "оплата",
          isLearnt: false
        }
      ]
    },
    {
      id: "3",
      name: "emotions",
      words: [
        {
          id: "31",
          origin: "hysterical",
          translation: "истерический",
          isLearnt: false
        },
        {
          id: "32",
          origin: "thirsty",
          translation: "испытывающий жажду",
          isLearnt: false
        },
        {
          id: "33",
          origin: "passionate",
          translation: "страстный",
          isLearnt: true
        },
        {
          id: "34",
          origin: "exhausted",
          translation: "измученный",
          isLearnt: false
        }
      ]
    }
  ]
};

const mainReducer = (state = initState, action) => {
  const { type, payload } = action;
  const cloneCategories = [...state.categories];
  let needCategoryIndex;
  let needWordIndex;

  switch (type) {
    // Caterogies actions
    case types.ADD_CATEGORY:
      return {
        ...state,
        categories: [...cloneCategories, payload]
      };

    case types.EDIT_CATEGORY:
      needCategoryIndex = cloneCategories.findIndex(
        category => category.id === payload.id
      );
      cloneCategories[needCategoryIndex] = payload;
      return {
        ...state,
        categories: cloneCategories
      };

    case types.DELETE_CATEGORY:
      const filteredCategories = cloneCategories.filter(
        el => el.id !== payload
      );
      return {
        ...state,
        categories: filteredCategories
      };

    // Word actions
    case types.ADD_WORD:
      needCategoryIndex = cloneCategories.findIndex(
        category => category.id === payload.categoryId
      );

      const newWords = [
        ...cloneCategories[needCategoryIndex].words,
        payload.newWord
      ];

      cloneCategories[needCategoryIndex] = {
        ...cloneCategories[needCategoryIndex],
        words: newWords
      };

      return {
        ...state,
        categories: cloneCategories
      };

    case types.EDIT_WORD:
      needCategoryIndex = cloneCategories.findIndex(
        category => category.id === payload.categoryId
      );
      needWordIndex = cloneCategories[needCategoryIndex].words.findIndex(
        word => word.id === payload.newEditedWord.id
      );

      cloneCategories[needCategoryIndex].words[needWordIndex] =
        payload.newEditedWord;

      cloneCategories[needCategoryIndex] = {
        ...cloneCategories[needCategoryIndex],
        words: [...cloneCategories[needCategoryIndex].words]
      };

      return {
        ...state,
        categories: cloneCategories
      };

    case types.DELETE_WORD:
      needCategoryIndex = cloneCategories.findIndex(
        category => category.id === payload.categoryId
      );
      const filteredWords = cloneCategories[needCategoryIndex].words.filter(
        el => el.id !== payload.wordId
      );
      cloneCategories[needCategoryIndex] = {
        ...cloneCategories[needCategoryIndex],
        words: filteredWords
      };

      return {
        ...state,
        categories: cloneCategories
      };

    case types.CHECK_WORD:
      needCategoryIndex = cloneCategories.findIndex(
        category => category.id === payload.categoryId
      );

      needWordIndex = cloneCategories[needCategoryIndex].words.findIndex(
        word => word.id === payload.wordId
      );

      cloneCategories[needCategoryIndex].words[
        needWordIndex
      ].isLearnt = !cloneCategories[needCategoryIndex].words[needWordIndex]
        .isLearnt;

      cloneCategories[needCategoryIndex] = {
        ...cloneCategories[needCategoryIndex],
        words: [...cloneCategories[needCategoryIndex].words]
      };

      return {
        ...state,
        categories: cloneCategories
      };
    default:
      return state;
  }
};

export default mainReducer;
