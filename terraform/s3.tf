resource "aws_s3_bucket" "myweb-bucket" {
  bucket        = var.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "myweb-bucket" {
  bucket = aws_s3_bucket.myweb-bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

  depends_on = [aws_s3_bucket.myweb-bucket]
}

resource "aws_s3_bucket_website_configuration" "myweb" {
  bucket = aws_s3_bucket.myweb-bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

  depends_on = [aws_s3_bucket.myweb-bucket]
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.myweb-bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Sid       = "PublicReadGetObject",
      Effect    = "Allow",
      Principal = "*",
      Action    = "s3:GetObject",
      Resource  = "${aws_s3_bucket.myweb-bucket.arn}/*"
    }]
  })

  depends_on = [aws_s3_bucket_public_access_block.myweb-bucket]
}

resource "aws_s3_bucket_policy" "bucket_oai_policy" {
  bucket = aws_s3_bucket.myweb-bucket.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Sid    = "CloudFrontRead",
      Effect = "Allow",
      Principal = {
        AWS = aws_cloudfront_origin_access_identity.oai.iam_arn
      },
      Action   = "s3:GetObject",
      Resource = "${aws_s3_bucket.myweb-bucket.arn}/*"
    }]
  })

  depends_on = [aws_s3_bucket.myweb-bucket]
}
