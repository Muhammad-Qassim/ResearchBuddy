from mongodb_helper import insert_pdf_to_mongo, get_pdf_from_mongo, delete_pdf_from_mongo

# Sample binary data (representing a PDF)
sample_pdf_content = b'%PDF-1.4\n%...'

# Insert PDF
pdf_id = insert_pdf_to_mongo('test_db', 'test_pdfs', sample_pdf_content, 'sample.pdf')
print(f"Inserted PDF with ID: {pdf_id}")

# Retrieve PDF
pdf_content = get_pdf_from_mongo('test_db', 'test_pdfs', 'sample.pdf')
print(f"Retrieved PDF content length: {len(pdf_content)}")

# Delete PDF
delete_pdf_from_mongo('test_db', 'test_pdfs', 'sample.pdf')
print("Deleted PDF from MongoDB")