const express = require("express");
const verifyRoles = require("../../middlewares/roleMiddleware");
const { ROLE } = require("../../constraints/role");
const {
  getAllForms,
  createNewForm,
  getFormById,
  updateFormById,
  deleteFormById,
} = require("../../controllers/form.controller");
const {
  checkRequiredFields,
  checkValidObjectId,
} = require("../../middlewares");
const router = express.Router();

router.use("/:id", checkValidObjectId);
router
  .route("/:id")
  .get(
    // #swagger.tags = ['Form']
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.summary = 'Get a form by id'
    // #swagger.description = 'Retrieve one form by MongoDB ObjectId. Draft forms are only accessible to admin users.'
    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'MongoDB ObjectId of the form.',
      type: 'string',
      example: '66f2a8e9e8e7a9d7b4f9a123'
    } */
    getFormById,
  )
  .put(
    // #swagger.tags = ['Form']
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.summary = 'Update form by admin'
    // #swagger.description = 'Update an existing form by MongoDB ObjectId. Accepts any editable form fields in the request body.'
    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'MongoDB ObjectId of the form to update.',
      type: 'string',
      example: '66f2a8e9e8e7a9d7b4f9a123'
    } */
    /* #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'Display title of the form.',
                example: 'Registration Form'
              },
              description: {
                type: 'string',
                description: 'Short explanation of the form purpose.',
                example: 'Collects participant registration information.'
              },
              order: {
                type: 'number',
                description: 'Sort order used when listing forms.',
                example: 1
              },
              status: {
                type: 'string',
                description: 'Publication status of the form.',
                example: 'DRAFT'
              }
            }
          }
        }
      }
    } */
    updateFormById,
  )
  .delete(
    // #swagger.tags = ['Form']
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.summary = 'Delete form by admin'
    // #swagger.description = 'Delete an existing form by MongoDB ObjectId.'
    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'MongoDB ObjectId of the form to delete.',
      type: 'string',
      example: '66f2a8e9e8e7a9d7b4f9a123'
    } */
    deleteFormById,
  );

router
  .use(verifyRoles(ROLE.ADMIN))
  .route("/")
  .get(
    // #swagger.tags = ['Form']
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.summary = 'Get all form by admin'
    // #swagger.description = 'Retrieve all forms. This endpoint is restricted to admin users.'
    getAllForms,
  )
  .post(
    // #swagger.tags = ['Form']
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.summary = 'Add new form by admin'
    // #swagger.description = 'Create a new form. Requires title, description, and order. If status is omitted, the form is created as draft.'
    /* #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'description', 'order'],
            properties: {
              title: {
                type: 'string',
                description: 'Display title of the form.',
                example: 'Registration Form'
              },
              description: {
                type: 'string',
                description: 'Short explanation of the form purpose.',
                example: 'Collects participant registration information.'
              },
              order: {
                type: 'number',
                description: 'Sort order used when listing forms.',
                example: 1
              },
              status: {
                type: 'string',
                description: 'Optional publication status. Defaults to draft when omitted.',
                example: 'DRAFT'
              }
            }
          }
        }
      }
    } */
    checkRequiredFields("title", "description", "order"),
    createNewForm,
  );

module.exports = router;
