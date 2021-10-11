import { NextFunction, Request, Response } from 'express'
import { testCollection } from '../utils/testCollection'
import { fetchCollection } from '../utils/fetchCollection'

export const postCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { submissionUrl, testUrl } = req.body

  // check that submission and test json exists, return send 404 or 500 if something goes wrong
  try {
    await fetchCollection(submissionUrl)
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      const error = new Error('Submission collection not found') as any
      error.status = 404
      return next(error)
    } else {
      return next(new Error('Something went wrong when fetching submission'))
    }
  }

  try {
    await fetchCollection(testUrl)
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      const error = new Error('Test collection not found') as any
      error.status = 404
      return next(error)
    } else {
      return next(
        new Error('Something went wrong when fetching test collection')
      )
    }
  }

  // test submission
  const testResults = await testCollection({
    testCollectionUrl: testUrl,
    submissionCollectionUrl: submissionUrl
  })

  res.send(testResults)
}
