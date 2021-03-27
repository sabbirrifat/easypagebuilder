export const updatePagesData = (data) => ({
    type: 'UPDATE_PAGES_DATA',
    payload: data
})

export const updateTranslation = (language) => ({
    type: 'CHANGE_TRANSLATION',
    payload: language
})

export const updateColors = (colors) => ({
    type: 'UPDATE_COLORS',
    payload: colors
})