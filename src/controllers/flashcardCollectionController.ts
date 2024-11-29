import catchAsync from '../utils/catchAsync'
import FlashcardCollection from '../models/flashcardCollectionModel'

const createFlashCardsCollection = catchAsync(async (req, res, next) => {
    const doc = await FlashcardCollection.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            data: doc,
        },
    })
})

const flashcardCollectionController = {
    createFlashCardsCollection,
}

export default flashcardCollectionController
