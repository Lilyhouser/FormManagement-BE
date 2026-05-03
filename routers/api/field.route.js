const express = require("express");
const verifyRoles = require("../../middlewares/roleMiddleware");
const { ROLE } = require("../../constraints/role");
const { checkValidObjectId } = require("../../middlewares");
const {
  addFieldToFormById,
  updateFieldById,
  deleteFieldById,
} = require("../../controllers/field.controller");
const router = express.Router({ mergeParams: true });

router.use(verifyRoles(ROLE.ADMIN));
router.route("/").post(
  // #swagger.tags = ['Field']
  // #swagger.security = [{ "bearerAuth": [] }]
  // #swagger.summary = 'Add field to form'
  // #swagger.description = 'Create a new field and attach it to the form identified by the form id in the URL.'
  /* #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    description: 'MongoDB ObjectId of the form that will receive the new field.',
    type: 'string',
    example: '66f2a8e9e8e7a9d7b4f9a123'
  } */
  /* #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            required: ['type', 'order', 'label', 'require'],
            properties: {
              type: {
                type: 'string',
                description: 'Input type for the field.',
                example: 'text'
              },
              placeholder: {
                type: 'string',
                description: 'Placeholder text displayed inside the input.',
                example: 'Enter your full name'
              },
              order: {
                type: 'string',
                description: 'Sort order of the field inside the form.',
                example: '1'
              },
              label: {
                type: 'string',
                description: 'Display label shown to users.',
                example: 'Full name'
              },
              require: {
                type: 'boolean',
                description: 'Whether users must provide a value for this field.',
                example: true
              },
              options: {
                type: 'array',
                description: 'Selectable options for choice-based field types.',
                items: {
                  type: 'string'
                },
                example: ['Student', 'Teacher', 'Other']
              }
            }
          }
        }
      }
    }
  } */
  checkValidObjectId("id"),
  addFieldToFormById,
);
router
  .route("/:fid")
  .put(
    // #swagger.tags = ['Field']
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.summary = 'Update field by id'
    // #swagger.description = 'Update an existing field in a form. The form id and field id must both be valid MongoDB ObjectIds.'
    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'MongoDB ObjectId of the form that owns the field.',
      type: 'string',
      example: '66f2a8e9e8e7a9d7b4f9a123'
    } */
    /* #swagger.parameters['fid'] = {
      in: 'path',
      required: true,
      description: 'MongoDB ObjectId of the field to update.',
      type: 'string',
      example: '66f2b2d3e8e7a9d7b4f9a456'
    } */
    /* #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Input type for the field.',
                example: 'select'
              },
              placeholder: {
                type: 'string',
                description: 'Placeholder text displayed inside the input.',
                example: 'Choose your role'
              },
              order: {
                type: 'string',
                description: 'Sort order of the field inside the form.',
                example: '2'
              },
              label: {
                type: 'string',
                description: 'Display label shown to users.',
                example: 'Role'
              },
              require: {
                type: 'boolean',
                description: 'Whether users must provide a value for this field.',
                example: false
              },
              options: {
                type: 'array',
                description: 'Selectable options for choice-based field types.',
                items: {
                  type: 'string'
                },
                example: ['Student', 'Teacher', 'Other']
              }
            }
          }
        }
      }
    } */
    checkValidObjectId("id", "fid"),
    updateFieldById,
  )
  .delete(
    // #swagger.tags = ['Field']
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.summary = 'Delete field by id'
    // #swagger.description = 'Delete an existing field from a form by form id and field id.'
    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'MongoDB ObjectId of the form that owns the field.',
      type: 'string',
      example: '66f2a8e9e8e7a9d7b4f9a123'
    } */
    /* #swagger.parameters['fid'] = {
      in: 'path',
      required: true,
      description: 'MongoDB ObjectId of the field to delete.',
      type: 'string',
      example: '66f2b2d3e8e7a9d7b4f9a456'
    } */
    checkValidObjectId("id", "fid"),
    deleteFieldById,
  );

module.exports = router;
