

## Plan: Add Locked State + Start Button to ChatConsole

**Problem:** The approved plan for a locked chat state with a "Start Interview" button was never implemented. ChatConsole still unlocks immediately on connect.

### Changes to `src/components/ChatConsole.tsx`

**1. Add two new state variables (after existing state declarations, ~line 27):**
- `isBotReady` (boolean, default false) — set true when `RTVIEvent.BotReady` fires
- `isInterviewStarted` (boolean, default false) — set true when user clicks Start

**2. Add `RTVIEvent.BotReady` event listener:**
- When fired, set `isBotReady = true`

**3. Add reset effect when disconnected:**
- When `isConnected` becomes false, reset both `isBotReady` and `isInterviewStarted` to false

**4. Add `handleStartInterview` function:**
- Sets `isInterviewStarted = true`
- Sends `"Hi, I am fully ready to start the interview"` via `pipecatClient.appendToContext({ role: "user", content: "Hi, I am fully ready to start the interview", run_immediately: true })`
- Adds the message to the chat as a user message

**5. Add locked overlay in the messages area:**
- When `isConnected && !isInterviewStarted`: show a centered overlay with:
  - Lock icon
  - "Waiting for bot..." text + disabled button when `!isBotReady`
  - "Bot is ready!" text + enabled green "Start Interview" button when `isBotReady`
- When `!isConnected` or `isInterviewStarted`: show normal chat content

**6. Disable input controls until interview started:**
- Text input and send button disabled when `!isInterviewStarted` (in addition to existing `!isConnected` check)

### Files Modified
- `src/components/ChatConsole.tsx` only

