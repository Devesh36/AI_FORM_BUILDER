const { pgTable , serial, text , varchar, integer  } = require("drizzle-orm/pg-core");

export const JsonForms=pgTable('jsonForms',{
    id:serial('id').primaryKey(),
    jsonform:text('jsonform').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
})

export const userResponses=pgTable('userResponses',{
    id:serial('id').primaryKey(),
    jsonResponse:text('jsonResponse').notNull(),
    createdBy:varchar('createdBy').default('anonymous'),
    createdAt:varchar('createdAt').notNull(),
    // formRef:integer('formRef').references(()=>JsonForms.id)
    formRef:integer('formRef').references(()=>JsonForms.id).notNull()
})