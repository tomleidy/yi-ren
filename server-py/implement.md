## server.js
### Helper Functions
- [ ] function normalizePort(value) {
- [ ] function onError(error) {
- [ ] function onListening() {


## bin/dev-setup.js
### Helper Functions
- [ ] function setup() {


## src/middleware/authMiddleware.js
### Helper Functions
- [ ] isAuthenticated = (req, res, next) => {
- [ ] isAdmin = (req, res, next) => {


## src/middleware/errorHandler.js
### Helper Functions
- [ ] errorHandler = (err, req, res, next) => {


## src/models/yijingText.js
### Helper Functions
- [ ] function sanitizeText(text) {
- [ ] function createFromCSV(userId, titleInfo, csvData) {
- [ ] function getTexts(hexagramNumbers, userId = null) {


## src/models/reading.js
### Helper Functions
- [ ] transformHandler = (doc, ret) => {
- [ ] function readingCreate(readingInfo) {
- [ ] function readingList(readingInfo) {
- [ ] function readingGet(readingInfo) {
- [ ] function readingUpdate(readingInfo) {
- [ ] function readingDelete(readingInfo) {


## src/scripts/inspectDatabase.js
### Helper Functions
- [ ] function inspectDatabase() {


## src/routes/reading.js
### Routes
- [ ] POST /new
- [ ] GET /list
- [ ] GET /id/:readingId
- [ ] PUT /id/:readingId
- [ ] DELETE /id/:readingId

## src/routes/auth.js
### Helper Functions
- [ ] login = (req, res) => {
- [ ] logout = (req, res, next) => {
### Routes
- [ ] POST /login
- [ ] POST /register
- [ ] GET /check-session
- [ ] GET /logout
- [ ] PUT /change-password


## src/routes/users.js
### Routes
- [ ] PUT /profile
- [ ] GET /:username/profile
- [ ] GET /

## src/routes/reference.js
### Routes
- [ ] GET /titles
- [ ] POST /upload
- [ ] GET /:hexagram
- [ ] GET /:hexagram1/:hexagram2

