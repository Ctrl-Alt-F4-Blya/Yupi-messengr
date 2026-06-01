const els = {
  splash: document.getElementById('splash-screen'),
  auth: document.getElementById('auth-screen'),
  app: document.getElementById('app-screen'),
  authTitle: document.getElementById('auth-title'),
  authTabs: Array.from(document.querySelectorAll('[data-auth-view]')),
  loginForm: document.getElementById('login-form'),
  registerForm: document.getElementById('register-form'),
  demoHint: document.getElementById('demo-hint'),

  homeBtn: document.getElementById('home-btn'),
  settingsGearBtn: document.getElementById('settings-gear-btn'),
  settingsNavBtn: document.getElementById('settings-nav-btn'),
  adminConsoleNavBtn: document.getElementById('admin-console-nav-btn'),
  archiveNavBtn: document.getElementById('archive-nav-btn'),
  upkNavBtn: document.getElementById('upk-nav-btn'),
  newChatBtn: document.getElementById('new-chat-btn'),
  sidebarRefreshBtn: document.getElementById('sidebar-refresh-btn'),
  logoutBtn: document.getElementById('logout-btn'),
  panelTitle: document.getElementById('panel-title'),

  profileAvatar: document.getElementById('profile-avatar'),
  profileName: document.getElementById('profile-name'),
  profileSubtitle: document.getElementById('profile-subtitle'),

  conversationSearch: document.getElementById('conversation-search'),
  storyRow: document.getElementById('story-row'),
  dashboardTabs: Array.from(document.querySelectorAll('#dashboard-tabs .chip-tab')),
  conversationList: document.getElementById('conversation-list'),
  archiveList: document.getElementById('archive-list'),
  upkList: document.getElementById('upk-list'),

  chatShell: document.getElementById('chat-shell'),
  settingsView: document.getElementById('settings-view'),
  upkView: document.getElementById('upk-view'),
  adminConsoleView: document.getElementById('admin-console-view'),
  adminConsoleRefreshBtn: document.getElementById('admin-console-refresh-btn'),
  adminConsoleUpdated: document.getElementById('admin-console-updated'),
  adminOnlineCount: document.getElementById('admin-online-count'),
  adminTotalUsers: document.getElementById('admin-total-users'),
  adminActiveSessions: document.getElementById('admin-active-sessions'),
  adminTotalMessages: document.getElementById('admin-total-messages'),
  adminOnlineUsers: document.getElementById('admin-online-users'),
  adminAccessLog: document.getElementById('admin-access-log'),
  adminNetworkList: document.getElementById('admin-network-list'),
  upkBackBtn: document.getElementById('upk-back-btn'),
  upkAvatar: document.getElementById('upk-avatar'),
  upkChannelTitle: document.getElementById('upk-channel-title'),
  upkChannelMeta: document.getElementById('upk-channel-meta'),
  upkCreateChannelBtn: document.getElementById('upk-create-channel-btn'),
  upkEmptyState: document.getElementById('upk-empty-state'),
  upkEmptyCreateBtn: document.getElementById('upk-empty-create-btn'),
  upkPostForm: document.getElementById('upk-post-form'),
  upkPostInput: document.getElementById('upk-post-input'),
  upkFeed: document.getElementById('upk-feed'),

  chatAvatar: document.getElementById('chat-avatar'),
  chatTitle: document.getElementById('chat-title'),
  chatStatus: document.getElementById('chat-status'),
  typingIndicator: document.getElementById('typing-indicator'),
  messageList: document.getElementById('message-list'),
  composerForm: document.getElementById('composer-form'),
  messageInput: document.getElementById('message-input'),
  emojiBtn: document.getElementById('emoji-btn'),

  favoriteToggleBtn: document.getElementById('favorite-toggle-btn'),
  muteToggleBtn: document.getElementById('mute-toggle-btn'),
  archiveToggleBtn: document.getElementById('archive-toggle-btn'),
  audioCallBtn: document.getElementById('audio-call-btn'),
  videoCallBtn: document.getElementById('video-call-btn'),

  settingsForm: document.getElementById('settings-form'),
  settingsName: document.getElementById('settings-name'),
  settingsLastName: document.getElementById('settings-last-name'),
  settingsBio: document.getElementById('settings-bio'),
  settingsYoutube: document.getElementById('settings-youtube'),
  settingsAvatarPreview: document.getElementById('settings-avatar-preview'),
  profileAvatarUploadBtn: document.getElementById('profile-avatar-upload-btn'),
  profileAvatarUploadInput: document.getElementById('profile-avatar-upload-input'),
  profileUpkBtn: document.getElementById('profile-upk-btn'),
  profileUpkCopy: document.getElementById('profile-upk-copy'),
  assetAdminCard: document.getElementById('asset-admin-card'),
  mediaRefreshBtn: document.getElementById('media-refresh-btn'),
  mediaSlotList: document.getElementById('media-slot-list'),
  backgroundGrid: document.getElementById('background-grid'),
  backgroundUploadBtn: document.getElementById('background-upload-btn'),
  backgroundUploadInput: document.getElementById('background-upload-input'),
  customBgVideo: document.getElementById('custom-bg-video'),
  profileUpkPicker: document.getElementById('profile-upk-picker'),

  upkSearchPanel: document.getElementById('upk-search-panel'),
  upkSearchInput: document.getElementById('upk-search-input'),
  upkSearchCount: document.getElementById('upk-search-count'),
  upkSearchPrevBtn: document.getElementById('upk-search-prev-btn'),
  upkSearchNextBtn: document.getElementById('upk-search-next-btn'),
  upkSearchListBtn: document.getElementById('upk-search-list-btn'),
  upkSearchCloseBtn: document.getElementById('upk-search-close-btn'),
  upkSearchResults: document.getElementById('upk-search-results'),

  infoShell: document.getElementById('info-shell'),
  browserShell: document.getElementById('browser-shell'),
  callShell: document.getElementById('call-shell'),
  infoAvatar: document.getElementById('info-avatar'),
  infoName: document.getElementById('info-name'),
  infoMeta: document.getElementById('info-meta'),
  contactOnlineBadge: document.getElementById('contact-online-badge'),

  browserButtons: Array.from(document.querySelectorAll('[data-browser]')),
  browserTitle: document.getElementById('browser-title'),
  browserNotice: document.getElementById('browser-notice'),
  browserFrame: document.getElementById('browser-frame'),
  openBrowserExternal: document.getElementById('open-browser-external'),
  musicStatusCard: document.getElementById('music-status-card'),
  musicCardIcon: document.getElementById('music-card-icon'),
  musicCardTitle: document.getElementById('music-card-title'),
  musicCardCopy: document.getElementById('music-card-copy'),
  musicOpenApp: document.getElementById('music-open-app'),
  musicProbeBtn: document.getElementById('music-probe-btn'),
  musicStatusText: document.getElementById('music-status-text'),
  musicPreviewStage: document.getElementById('music-preview-stage'),
  musicPreviewService: document.getElementById('music-preview-service'),
  musicPreviewArt: document.getElementById('music-preview-art'),
  musicPreviewArtist: document.getElementById('music-preview-artist'),
  musicPreviewSong: document.getElementById('music-preview-song'),
  musicPreviewHint: document.getElementById('music-preview-hint'),
  musicPreviewOpenBtn: document.getElementById('music-preview-open-btn'),
  musicMobileBrowser: document.querySelector('.music-mobile-browser'),
  musicMobileUrl: document.getElementById('music-mobile-url'),
  musicTrackAuthor: document.getElementById('music-track-author'),
  musicTrackTitle: document.getElementById('music-track-title'),
  musicProgressFill: document.getElementById('music-progress-fill'),
  musicPlayBtn: document.getElementById('music-play-btn'),
  musicPrevBtn: document.getElementById('music-prev-btn'),
  musicNextBtn: document.getElementById('music-next-btn'),
  musicShuffleBtn: document.getElementById('music-shuffle-btn'),
  musicWindowBtn: document.getElementById('music-window-btn'),
  musicMiniWindow: document.getElementById('music-mini-window'),
  musicMiniTitle: document.getElementById('music-mini-title'),
  musicMiniUrl: document.getElementById('music-mini-url'),
  musicMiniFrame: document.getElementById('music-mini-frame'),
  musicMiniFallback: document.getElementById('music-mini-fallback'),
  musicMiniCloseBtn: document.getElementById('music-mini-close-btn'),
  musicMiniExternalBtn: document.getElementById('music-mini-external-btn'),
  callPanelBackBtn: document.getElementById('call-panel-back-btn'),
  utilitySwapBtn: document.getElementById('utility-swap-btn'),

  incomingCallToast: document.getElementById('incoming-call-toast'),
  incomingCallToastAvatar: document.getElementById('incoming-call-toast-avatar'),
  incomingCallToastName: document.getElementById('incoming-call-toast-name'),
  incomingCallToastMeta: document.getElementById('incoming-call-toast-meta'),
  incomingCallToastAccept: document.getElementById('incoming-call-toast-accept'),
  incomingCallToastReject: document.getElementById('incoming-call-toast-reject'),
  incomingCallCard: document.getElementById('incoming-call-card'),
  activeCallCard: document.getElementById('active-call-card'),
  incomingCallAvatar: document.getElementById('incoming-call-avatar'),
  incomingCallName: document.getElementById('incoming-call-name'),
  incomingCallMeta: document.getElementById('incoming-call-meta'),
  acceptCallBtn: document.getElementById('accept-call-btn'),
  rejectCallBtn: document.getElementById('reject-call-btn'),
  callStageTitle: document.getElementById('call-stage-title'),
  remoteVideo: document.getElementById('remote-video'),
  localVideo: document.getElementById('local-video'),
  callMicBtn: document.getElementById('call-mic-btn'),
  callSoundBtn: document.getElementById('call-sound-btn'),
  callCameraBtn: document.getElementById('call-camera-btn'),
  callScreenBtn: document.getElementById('call-screen-btn'),
  callEndBtn: document.getElementById('call-end-btn'),

  infoAudioCall: document.getElementById('info-audio-call'),
  infoVideoCall: document.getElementById('info-video-call'),

  channelInfoShell: document.getElementById('channel-info-shell'),
  channelInfoCloseBtn: document.getElementById('channel-info-close-btn'),
  channelInfoAvatar: document.getElementById('channel-info-avatar'),
  channelInfoTitle: document.getElementById('channel-info-title'),
  channelInfoMeta: document.getElementById('channel-info-meta'),
  channelInfoOwnerTools: document.getElementById('channel-info-owner-tools'),
  channelInfoNameInput: document.getElementById('channel-info-name-input'),
  channelInfoAvatarUploadBtn: document.getElementById('channel-info-avatar-upload-btn'),
  channelInfoAvatarUploadInput: document.getElementById('channel-info-avatar-upload-input'),
  channelInfoSaveBtn: document.getElementById('channel-info-save-btn'),
  channelInfoMembers: document.getElementById('channel-info-members'),

  newChatModal: document.getElementById('new-chat-modal'),
  createViewTabs: Array.from(document.querySelectorAll('[data-create-view]')),
  directCreateView: document.getElementById('direct-create-view'),
  groupCreateView: document.getElementById('group-create-view'),
  yupiKeyCreateView: document.getElementById('yupikey-create-view'),

  userSearchInput: document.getElementById('user-search-input'),
  userSearchResults: document.getElementById('user-search-results'),
  groupTitleInput: document.getElementById('group-title-input'),
  groupSearchInput: document.getElementById('group-search-input'),
  groupSearchResults: document.getElementById('group-search-results'),
  groupSelectedUsers: document.getElementById('group-selected-users'),
  createGroupBtn: document.getElementById('create-group-btn'),
  yupiKeyTitleInput: document.getElementById('yupikey-title-input'),
  yupiKeySearchInput: document.getElementById('yupikey-search-input'),
  yupiKeySearchResults: document.getElementById('yupikey-search-results'),
  yupiKeySelectedUsers: document.getElementById('yupikey-selected-users'),
  createYupiKeyBtn: document.getElementById('create-yupikey-btn'),

  contextMenu: document.getElementById('chat-context-menu'),
  contextButtons: Array.from(document.querySelectorAll('#chat-context-menu [data-context-action]')),
  upkActionButtons: Array.from(document.querySelectorAll('[data-upk-action]')),
};

const rtcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
  iceCandidatePoolSize: 8,
};

const browserSources = {
  vk: {
    title: 'VK Музыка',
    short: 'VK',
    url: 'https://vk.com/audio',
    embedUrl: 'https://m.vk.com/audio',
    popupUrl: 'https://vk.com/audio',
    popupName: 'YupiMusicVK',
    icon: '♫',
    copy: 'VK часто ломает iframe. Внутри показываем превью, настоящий сайт открывается кнопкой.',
    trackAuthor: 'VK Музыка',
    trackTitle: 'Моя музыка',
    previewArtist: 'VK Музыка',
    previewSong: 'Плейлист и рекомендации',
    previewHint: 'VK часто блокирует iframe, поэтому внутри оставлен такой же телефонный плеер и кнопка открытия.',
    serviceClass: 'vk',
    localPreview: true,
  },
  yandex: {
    title: 'Яндекс Музыка',
    short: 'ЯМ',
    url: 'https://music.yandex.ru/home',
    embedUrl: 'https://music.yandex.ru/home',
    popupUrl: 'https://music.yandex.ru/home',
    popupName: 'YupiMusicYandex',
    icon: '♫',
    copy: 'Яндекс Музыка обычно не даёт себя встроить. Открывайте сервис отдельной вкладкой.',
    trackAuthor: 'Яндекс',
    trackTitle: 'Название',
    previewArtist: 'Яндекс Музыка',
    previewSong: 'Моя волна',
    previewHint: 'Яндекс Музыка запрещает нормальное iframe-встраивание, поэтому внутри показан красивый превью-плеер. Настоящий сайт открывается кнопкой.',
    serviceClass: 'yandex',
    localPreview: true,
  },
  spotify: {
    title: 'Spotify',
    short: 'SP',
    url: 'https://open.spotify.com/',
    embedUrl: 'https://open.spotify.com/',
    popupUrl: 'https://open.spotify.com/',
    popupName: 'YupiMusicSpotify',
    icon: '♫',
    copy: 'Spotify чаще всего запрещает iframe. Внутри превью, настоящий сайт — отдельным окном.',
    trackAuthor: 'Spotify',
    trackTitle: 'Your Library',
    previewArtist: 'Spotify',
    previewSong: 'Liked Songs',
    previewHint: 'Spotify обычно запрещает iframe, внешний запуск и мини-окно остались рабочими.',
    serviceClass: 'spotify',
    localPreview: true,
  },
};

const state = {
  token: localStorage.getItem('yupi_token') || '',
  me: null,
  panelMode: 'chat',
  filter: 'all',
  conversations: [],
  messages: [],
  upkPosts: [],
  activeConversationId: null,
  ws: null,
  typingConversationId: null,
  typingTimer: null,
  browser: {
    active: null,
    url: '',
    title: '',
    pausedSnapshot: null,
    probes: {},
  },
  searches: {
    direct: [],
    group: [],
    yupikey: [],
  },
  createView: 'direct',
  selectedGroupUsers: [],
  selectedYupiKeyUsers: [],
  contextConversationId: null,
  call: {
    active: false,
    callId: '',
    status: 'idle',
    video: false,
    peer: null,
    localStream: null,
    remoteStream: null,
    targetUser: null,
    targetConversationId: null,
    muted: false,
    speakerMuted: false,
    cameraOff: false,
    sharingScreen: false,
    remoteSharingScreen: false,
    screenStream: null,
    screenSender: null,
    pendingIce: [],
    reconnectTimer: null,
  },
  pendingIncomingCall: null,
  earlyCallIce: {},
  serverInfo: null,
  utilityFocus: 'call',
  profileUpkPickerOpen: false,
  upkSearch: {
    open: false,
    query: '',
    matches: [],
    index: 0,
    listOpen: false,
  },
  channelInfoConversationId: null,
  channelMembers: [],
  adminConsole: null,
  media: {
    manifest: null,
    slots: {},
    backgrounds: [],
    activeBackground: localStorage.getItem('yupi_custom_background') || '',
  },
};

function switchScreen(target) {
  [els.splash, els.auth, els.app].forEach((node) => node.classList.add('hidden'));
  target.classList.remove('hidden');
  document.body.dataset.screen = target.id.replace('-screen', '');
}

function apiHeaders(extra = {}) {
  const headers = { 'Content-Type': 'application/json', ...extra };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  return headers;
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: apiHeaders(options.headers || {}),
  });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const message = typeof data === 'object' && data && data.detail ? data.detail : 'Ошибка запроса';
    throw new Error(message);
  }
  return data;
}

function showToast(message, type = '') {
  const host = document.getElementById('toast-container');
  const node = document.createElement('div');
  node.className = `toast ${type}`.trim();
  node.textContent = message;
  host.appendChild(node);
  setTimeout(() => node.remove(), 3200);
}



function slotFileUrl(slot) {
  const item = state.media.slots[String(slot)] || state.media.slots[Number(slot)];
  return item && item.file && item.file.url ? item.file.url : '';
}

function setCustomIconForSlot(slot, url) {
  document.querySelectorAll(`[data-media-slot="${slot}"]`).forEach((node) => {
    if (!url) {
      node.classList.remove('has-custom-media');
      node.style.removeProperty('--custom-icon-url');
      if (node.dataset.originalText !== undefined) node.textContent = node.dataset.originalText;
      return;
    }
    if (node.dataset.originalText === undefined) node.dataset.originalText = node.textContent || '';
    node.classList.add('has-custom-media');
    node.style.setProperty('--custom-icon-url', `url("${url}")`);
    if (!node.matches('.rail-icon, .search-icon')) node.textContent = '';
  });
}

function applyLocalMedia() {
  const logoUrl = slotFileUrl(1);
  document.querySelectorAll('.yupi-logo img').forEach((img) => {
    if (!img.dataset.defaultSrc) img.dataset.defaultSrc = img.getAttribute('src') || '';
    img.src = logoUrl || img.dataset.defaultSrc;
  });

  Object.keys(state.media.slots || {}).forEach((slot) => {
    const url = slotFileUrl(slot);
    setCustomIconForSlot(slot, url);
  });

  applyCustomBackground();
}

function applyCustomBackground() {
  const activeName = state.media.activeBackground || '';
  const item = (state.media.backgrounds || []).find((bg) => bg.name === activeName);
  const video = els.customBgVideo;
  document.body.classList.remove('has-custom-background', 'has-custom-video-background');
  document.documentElement.style.removeProperty('--custom-bg-image');

  if (video) {
    video.pause();
    video.removeAttribute('src');
    video.load();
    video.classList.add('hidden');
  }

  if (!item) return;

  document.body.classList.add('has-custom-background');
  if (item.type === 'video' && video) {
    document.body.classList.add('has-custom-video-background');
    video.src = item.url;
    video.classList.remove('hidden');
    video.play().catch(() => {});
  } else {
    document.documentElement.style.setProperty('--custom-bg-image', `url("${item.url}")`);
  }
}

function mediaExtensionHint(slotFile) {
  if (!slotFile) return 'Файл не загружен';
  return slotFile.name;
}

function renderMediaSettings() {
  if (!els.backgroundGrid) return;
  if (els.mediaSlotList) {
    const slots = state.media.manifest?.slots || [];
    els.mediaSlotList.innerHTML = isSupportUser() ? slots.map((slot) => {
      const preview = slot.file
        ? `<img class="media-slot-preview" src="${slot.file.url}" alt="">`
        : `<div class="media-slot-preview"></div>`;
      return `
        <div class="media-slot-row" data-slot-row="${slot.id}">
          <div class="media-slot-number">${slot.id}</div>
          <div class="media-slot-title">
            <strong>${escapeHtml(slot.label)}</strong>
            <span>${escapeHtml(mediaExtensionHint(slot.file))}</span>
          </div>
          <div class="media-slot-actions">
            ${preview}
            <button type="button" class="media-upload-btn" data-icon-upload-btn="${slot.id}">Загрузить</button>
            <input type="file" class="hidden" data-icon-upload="${slot.id}" accept=".png,.jpg,.jpeg,image/png,image/jpeg" />
          </div>
        </div>
      `;
    }).join('') : '';
  }

  if (!state.media.backgrounds.length) {
    els.backgroundGrid.innerHTML = '<div class="media-bg-empty">Фонов пока нет. Загрузите PNG/JPEG/GIF/WEBP/MP4/WEBM или положите файл в папку custom_media/backgrounds.</div>';
  } else {
    els.backgroundGrid.innerHTML = state.media.backgrounds.map((bg) => {
      const active = bg.name === state.media.activeBackground ? ' active' : '';
      const preview = bg.type === 'video'
        ? `<video src="${bg.url}" muted loop playsinline></video>`
        : `<img src="${bg.url}" alt="">`;
      return `
        <div class="media-bg-card${active}" title="${escapeHtml(bg.name)}">
          ${preview}
          <button type="button" data-background-name="${escapeHtml(bg.name)}" aria-label="Применить фон ${escapeHtml(bg.name)}"></button>
        </div>
      `;
    }).join('');
  }
}

function renderAdminConsole() {
  const data = state.adminConsole;
  if (!els.adminConsoleView) return;
  if (!data) {
    if (els.adminOnlineUsers) els.adminOnlineUsers.innerHTML = '<div class="admin-empty">Нажмите «Обновить», чтобы получить статистику.</div>';
    return;
  }
  if (els.adminOnlineCount) els.adminOnlineCount.textContent = String(data.online_count || 0);
  if (els.adminTotalUsers) els.adminTotalUsers.textContent = String(data.total_users || 0);
  if (els.adminActiveSessions) els.adminActiveSessions.textContent = String(data.active_sessions || 0);
  if (els.adminTotalMessages) els.adminTotalMessages.textContent = String(data.messages || 0);
  if (els.adminConsoleUpdated) {
    const date = data.generated_at ? new Date(data.generated_at) : new Date();
    els.adminConsoleUpdated.textContent = `Обновлено: ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
  }
  if (els.adminNetworkList) {
    const network = data.network || {};
    const urls = network.urls || [];
    els.adminNetworkList.innerHTML = urls.length ? urls.map((item) => `
      <div class="admin-user-row">
        <div>
          <b>${escapeHtml(item.label || item.kind || 'Сеть')}</b>
          <span>${escapeHtml(item.url || '')}</span>
        </div>
      </div>
    `).join('') : '<div class="admin-empty">Radmin IP не найден. Откройте Radmin VPN и проверьте, что сервер подключён к сети.</div>';
  }

  const users = data.online_users || [];
  if (els.adminOnlineUsers) {
    els.adminOnlineUsers.innerHTML = users.length ? users.map((user) => {
      const ips = (user.ip_addresses || []).join(', ') || 'IP не определён';
      const connections = user.connections || [];
      const devices = connections.map((conn) => {
        const kind = conn.client_kind || 'unknown';
        const agent = (conn.user_agent || '').slice(0, 90);
        return `${escapeHtml(kind)} · ${escapeHtml(conn.ip_address || '')}${agent ? ` · ${escapeHtml(agent)}` : ''}`;
      }).join('<br>');
      return `
      <div class="admin-user-row">
        <div class="avatar mini" data-admin-user-avatar="${user.id}"></div>
        <div>
          <b>${escapeHtml(user.display_name || 'Пользователь')}</b>
          <span>${escapeHtml(user.email || '')}</span>
          <span>IP: ${escapeHtml(ips)}</span>
          ${devices ? `<small>${devices}</small>` : ''}
        </div>
      </div>`;
    }).join('') : '<div class="admin-empty">Сейчас онлайн никого нет.</div>';
    els.adminOnlineUsers.querySelectorAll('[data-admin-user-avatar]').forEach((node) => {
      const user = users.find((item) => String(item.id) === String(node.dataset.adminUserAvatar));
      if (user) setAvatar(node, user.display_name, user.avatar_color || '#8f6bff', user.avatar_url || '');
    });
  }

  const accessLog = data.access_log || [];
  if (els.adminAccessLog) {
    els.adminAccessLog.innerHTML = accessLog.length ? accessLog.map((item) => {
      const when = item.created_at ? new Date(item.created_at).toLocaleString() : '';
      return `
        <div class="admin-user-row compact">
          <div>
            <b>${escapeHtml(item.display_name || item.email || 'Гость')}</b>
            <span>${escapeHtml(item.event_type || '')} · ${escapeHtml(item.client_kind || '')} · ${escapeHtml(item.ip_address || '')}</span>
            <small>${escapeHtml(when)}${item.user_agent ? ` · ${escapeHtml(String(item.user_agent).slice(0, 120))}` : ''}</small>
          </div>
        </div>
      `;
    }).join('') : '<div class="admin-empty">Журнал пока пуст.</div>';
  }
}

async function refreshAdminConsole({ quiet = false } = {}) {
  if (!isSupportUser()) return;
  try {
    state.adminConsole = await api('/api/admin/console');
    renderAdminConsole();
    if (!quiet) showToast('Консоль обновлена');
  } catch (error) {
    if (!quiet) showToast(error.message || 'Не удалось обновить консоль', 'error');
  }
}

async function loadLocalMedia({ quiet = true } = {}) {
  try {
    const manifest = await api('/api/local-media/manifest');
    state.media.manifest = manifest;
    state.media.slots = {};
    (manifest.slots || []).forEach((slot) => { state.media.slots[String(slot.id)] = slot; });
    state.media.backgrounds = manifest.backgrounds || [];
    if (state.media.activeBackground && !state.media.backgrounds.some((bg) => bg.name === state.media.activeBackground)) {
      state.media.activeBackground = '';
      localStorage.removeItem('yupi_custom_background');
    }
    applyLocalMedia();
    renderMediaSettings();
    if (!quiet) showToast('Медиа обновлены');
  } catch (error) {
    if (!quiet) showToast(error.message || 'Не удалось загрузить медиа', 'error');
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
    reader.readAsDataURL(file);
  });
}

async function uploadProfileAvatar(file) {
  if (!file) return;
  const dataUrl = await readFileAsDataUrl(file);
  state.me = await api('/api/me/avatar', {
    method: 'POST',
    body: JSON.stringify({
      filename: file.name,
      data_url: dataUrl,
    }),
  });
  renderProfile();
  showToast('Аватар обновлён');
}

async function uploadLocalMedia({ kind, slot, file }) {
  if (!file) return;
  const dataUrl = await readFileAsDataUrl(file);
  const payload = {
    kind,
    slot,
    filename: file.name,
    data_url: dataUrl,
  };
  await api('/api/local-media/upload', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  await loadLocalMedia({ quiet: true });
  showToast(kind === 'background' ? 'Фон загружен' : `Иконка ${slot} загружена`);
}

async function selectLocalBackground(name) {
  if (!name) return;
  await api('/api/local-media/background/select', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  state.media.activeBackground = name;
  localStorage.setItem('yupi_custom_background', name);
  applyCustomBackground();
  renderMediaSettings();
  showToast('Фон применён');
}


function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatTime(value) {
  if (!value) return '';
  const date = new Date(value);
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function setAvatar(el, name = 'Y', color = '#8f6bff', avatarUrl = '') {
  if (!el) return;
  el.style.display = 'grid';
  el.style.placeItems = 'center';
  if (avatarUrl) {
    el.classList.add('has-avatar-image');
    el.style.background = `center / cover no-repeat url("${avatarUrl}")`;
    el.textContent = '';
    return;
  }
  el.classList.remove('has-avatar-image');
  const letter = (name || 'Y').trim().charAt(0).toUpperCase() || 'Y';
  el.textContent = letter;
  el.style.background = `linear-gradient(145deg, ${color}, rgba(255,255,255,0.08))`;
}

function isSupportUser() {
  return Boolean(state.me && String(state.me.email || '').toLowerCase() === 'support@yupi.local');
}

function splitDisplayName(value = '') {
  const parts = String(value || '').trim().split(/\s+/).filter(Boolean);
  return { first: parts[0] || '', last: parts.slice(1).join(' ') };
}

function normalizeProfileFirstName() {
  if (state.me?.first_name) return state.me.first_name;
  return splitDisplayName(state.me?.display_name || '').first || state.me?.display_name || '';
}

function normalizeProfileLastName() {
  if (state.me?.last_name) return state.me.last_name;
  return splitDisplayName(state.me?.display_name || '').last || '';
}

function setAuthView(view) {
  const login = view === 'login';
  els.loginForm.classList.toggle('hidden', !login);
  els.registerForm.classList.toggle('hidden', login);
  els.authTitle.textContent = login ? 'Войти в Yupi' : 'Регистрация в Yupi';
  els.authTabs.forEach((btn) => btn.classList.toggle('active', btn.dataset.authView === view));
}

function setCreateView(view) {
  state.createView = view;
  els.createViewTabs.forEach((btn) => btn.classList.toggle('active', btn.dataset.createView === view));
  els.directCreateView.classList.toggle('hidden', view !== 'direct');
  els.groupCreateView.classList.toggle('hidden', view !== 'group');
  els.yupiKeyCreateView.classList.toggle('hidden', view !== 'yupikey');
}

function conversationPreview(conversation) {
  if (!conversation.last_message) return conversation.is_group ? 'Группа создана' : 'Диалог создан';
  return conversation.last_message.body;
}

function getActiveConversation() {
  return state.conversations.find((item) => item.id === state.activeConversationId) || null;
}

function ensureConversationInState(conversation) {
  if (!conversation || !conversation.id) return;
  const idx = state.conversations.findIndex((item) => item.id === conversation.id);
  if (idx >= 0) {
    state.conversations[idx] = { ...state.conversations[idx], ...conversation };
  } else {
    state.conversations.unshift(conversation);
  }
}

function upsertMessage(message) {
  if (!message || !message.id) return;
  const exists = state.messages.some((item) => item.id === message.id);
  if (exists) {
    state.messages = state.messages.map((item) => item.id === message.id ? message : item);
  } else {
    state.messages.push(message);
  }
  state.messages.sort((a, b) => Number(a.id || 0) - Number(b.id || 0));
}

function scrollMessagesToBottom() {
  requestAnimationFrame(() => {
    if (els.messageList) els.messageList.scrollTop = els.messageList.scrollHeight;
  });
}

function focusComposer() {
  requestAnimationFrame(() => {
    if (!els.messageInput || els.messageInput.disabled) return;
    els.messageInput.focus();
  });
}

function isArchived(conversation) {
  return Boolean(conversation?.prefs?.is_archived);
}

function isMuted(conversation) {
  return Boolean(conversation?.prefs?.is_muted);
}

function isFavorite(conversation) {
  return Boolean(conversation?.prefs?.is_favorite);
}

function isYupiKey(conversation) {
  return conversation?.kind === 'yupikey';
}

function getOwnedYupiKeys() {
  return state.conversations.filter((item) => item.kind === 'yupikey' && item.is_owner);
}

function getMyYupiKey() {
  const linkedId = Number(state.me?.profile_upk_conversation_id || 0);
  if (linkedId) {
    const linked = state.conversations.find((item) => item.id === linkedId && item.kind === 'yupikey');
    if (linked) return linked;
  }
  return getOwnedYupiKeys()[0] || null;
}

function getActiveYupiKey() {
  const active = getActiveConversation();
  if (active && active.kind === 'yupikey') return active;
  return state.conversations.find((item) => item.kind === 'yupikey') || null;
}

function conversationAvatarUrl(conversation) {
  if (!conversation) return '';
  if (conversation.kind === 'direct') return conversation.other_user?.avatar_url || '';
  return conversation.avatar_url || '';
}

function conversationAvatarColor(conversation) {
  if (!conversation) return '#8f6bff';
  return conversation.kind === 'direct' ? (conversation.other_user?.avatar_color || '#8f6bff') : '#6a49d9';
}

function upkTitle(conversation) {
  if (!conversation) return 'UPK';
  return (conversation.title || 'UPK').replace(/^Yupi Key\s[-—]\s/i, '');
}

function getVisibleConversations() {
  const term = els.conversationSearch.value.trim().toLowerCase();
  let items = state.conversations.slice();

  if (state.panelMode === 'archive') {
    items = items.filter((item) => isArchived(item));
  } else {
    items = items.filter((item) => !isArchived(item));
  }

  if (state.filter === 'direct') items = items.filter((item) => item.kind === 'direct');
  if (state.filter === 'group') items = items.filter((item) => item.kind !== 'direct');
  if (state.filter === 'fav') items = items.filter((item) => isFavorite(item));
  if (state.filter === 'online') items = items.filter((item) => item.is_online);

  if (term) {
    items = items.filter((item) => {
      const hay = `${item.title} ${conversationPreview(item)} ${(item.other_user?.bio || '')}`.toLowerCase();
      return hay.includes(term);
    });
  }

  items.sort((a, b) => {
    const aTime = a.last_message ? a.last_message.created_at : a.created_at;
    const bTime = b.last_message ? b.last_message.created_at : b.created_at;
    return String(bTime).localeCompare(String(aTime));
  });
  return items;
}


function renderProfileUpkPicker() {
  if (!els.profileUpkPicker) return;
  const owned = getOwnedYupiKeys();
  const linkedId = Number(state.me?.profile_upk_conversation_id || 0);
  els.profileUpkPicker.classList.toggle('hidden', !state.profileUpkPickerOpen);
  if (!state.profileUpkPickerOpen) return;
  if (!owned.length) {
    els.profileUpkPicker.innerHTML = `
      <div class="profile-upk-picker-empty">
        <b>UPK-каналов пока нет.</b>
        <span>Создайте канал, чтобы привязать его к профилю.</span>
        <button type="button" class="secondary-btn small" data-profile-upk-create="1">Создать UPK</button>
      </div>
    `;
  } else {
    els.profileUpkPicker.innerHTML = [
      ...owned.map((channel) => `
        <button type="button" class="profile-upk-choice ${linkedId === channel.id ? 'active' : ''}" data-profile-upk-bind="${channel.id}">
          <span class="upk-row-avatar">${escapeHtml(upkTitle(channel).charAt(0).toUpperCase() || 'U')}</span>
          <span><b>${escapeHtml(upkTitle(channel))}</b><small>${channel.member_count} подписчиков${linkedId === channel.id ? ' · привязан' : ''}</small></span>
        </button>
      `),
      linkedId ? `<button type="button" class="profile-upk-choice unlink" data-profile-upk-bind="0"><span>×</span><span><b>Отвязать UPK</b><small>Убрать канал из профиля</small></span></button>` : ''
    ].join('');
  }
  els.profileUpkPicker.querySelectorAll('[data-profile-upk-bind]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await linkProfileUpk(Number(button.dataset.profileUpkBind || 0));
      } catch (error) {
        showToast(error.message || 'Не удалось привязать UPK', 'error');
      }
    });
  });
  els.profileUpkPicker.querySelector('[data-profile-upk-create]')?.addEventListener('click', () => openCreateYupiKeyModal());
}

function renderProfile() {
  if (!state.me) return;
  const avatarUrl = state.me.avatar_url || '';
  setAvatar(els.profileAvatar, state.me.display_name, state.me.avatar_color, avatarUrl);
  setAvatar(els.settingsAvatarPreview, state.me.display_name, state.me.avatar_color, avatarUrl);
  els.profileName.textContent = state.me.display_name;
  els.profileSubtitle.textContent = state.me.bio || 'Yupi user';
  if (els.settingsName) els.settingsName.value = normalizeProfileFirstName();
  if (els.settingsLastName) els.settingsLastName.value = normalizeProfileLastName();
  if (els.settingsBio) els.settingsBio.value = state.me.bio || '';
  if (els.settingsYoutube) els.settingsYoutube.value = state.me.youtube_url || '';
  els.assetAdminCard?.classList.toggle('hidden', !isSupportUser());
  els.adminConsoleNavBtn?.classList.toggle('hidden', !isSupportUser());
  renderMediaSettings();
  const myUpk = getMyYupiKey();
  const linkedId = Number(state.me?.profile_upk_conversation_id || 0);
  if (els.profileUpkCopy) {
    els.profileUpkCopy.textContent = myUpk && linkedId
      ? `Привязан канал: ${upkTitle(myUpk)}`
      : myUpk
      ? 'Выберите, какой UPK показать в профиле.'
      : 'Создайте UPK, и его можно будет привязать к профилю.';
  }
  if (els.profileUpkBtn) {
    els.profileUpkBtn.textContent = myUpk ? (state.profileUpkPickerOpen ? 'Скрыть' : 'Привязать') : 'Создать';
  }
  renderProfileUpkPicker();
}

function renderStories() {
  const items = state.conversations.slice(0, 7);
  const visibleItems = items.length ? items : [];
  const placeholders = Math.max(0, 7 - visibleItems.length);
  els.storyRow.innerHTML = [
    ...visibleItems.map((item, index) => `
      <button class="story-bubble ${index > 1 ? 'dim' : ''}" data-story-id="${item.id}" title="${escapeHtml(item.title || 'Yupi')}">
        ${escapeHtml((item.title || 'Y').trim().charAt(0).toUpperCase())}
      </button>
    `),
    ...Array.from({ length: placeholders }, () => '<button class="story-bubble dim" type="button" aria-hidden="true"></button>')
  ].join('');
  els.storyRow.querySelectorAll('[data-story-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      await openConversation(Number(button.dataset.storyId));
    });
  });
}

function railActive(mode) {
  els.archiveNavBtn.classList.toggle('active', mode === 'archive');
  els.upkNavBtn.classList.toggle('active', mode === 'upk');
  els.settingsNavBtn.classList.toggle('active', mode === 'settings');
  els.adminConsoleNavBtn?.classList.toggle('active', mode === 'console');
  els.newChatBtn.classList.toggle('active', mode === 'chat');
}

function renderConversationCard(conversation) {
  const status = conversation.is_group
    ? `${conversation.member_count} участников`
    : conversation.is_online ? 'online' : 'offline';
  const statuses = [];
  if (conversation.kind !== 'direct') statuses.push('<span class="status-chip group">group</span>');
  if (conversation.is_online) statuses.push('<span class="status-chip online">online</span>');
  if (isFavorite(conversation)) statuses.push('<span class="status-chip favorite">fav</span>');
  if (isMuted(conversation)) statuses.push('<span class="status-chip muted">mute</span>');
  const isActive = state.activeConversationId === conversation.id;
  const quickActions = isActive ? `
    <div class="conversation-actions">
      <button class="mini-action ${isMuted(conversation) ? 'active' : ''}" data-card-action="mute" title="Выкл. звук">🔇</button>
      <button class="mini-action ${isArchived(conversation) ? 'active' : ''}" data-card-action="archive" title="Архив">🗂</button>
      <button class="mini-action" data-card-action="attach" title="Скрепка">📎</button>
      ${conversation.kind === 'direct' ? `<button class="mini-action" data-card-action="audio-call" title="Позвонить">📞</button>` : ''}
      ${conversation.kind === 'direct' ? `<button class="mini-action" data-card-action="video-call" title="Видеозвонок">🎥</button>` : ''}
      <button class="mini-action danger" data-card-action="delete" title="Удалить">🗑</button>
    </div>
  ` : '';
  return `
    <div class="conversation-card ${isActive ? 'active' : ''}" data-conversation-id="${conversation.id}">
      <div class="avatar" data-avatar="${conversation.id}"></div>
      <div class="conversation-main">
        <div class="conversation-topline">
          <div class="item-title">${escapeHtml(conversation.title)}</div>
          <div class="small-muted">${formatTime(conversation.last_message?.created_at || conversation.created_at)}</div>
        </div>
        <div class="item-preview">${escapeHtml(conversationPreview(conversation))}</div>
        <div class="item-status-line">${status}</div>
        ${quickActions}
      </div>
      <div class="item-meta">
        <div class="status-dots">${statuses.join('')}</div>
      </div>
    </div>
  `;
}

function bindConversationCards(host) {
  host.querySelectorAll('[data-conversation-id]').forEach((card) => {
    const conversationId = Number(card.dataset.conversationId);
    const conversation = state.conversations.find((item) => item.id === conversationId);
    const avatar = card.querySelector('[data-avatar]');
    if (conversation) {
      setAvatar(avatar, conversation.title, conversationAvatarColor(conversation), conversationAvatarUrl(conversation));
    }
    card.addEventListener('click', async () => {
      await openConversation(conversationId);
    });
    card.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      state.contextConversationId = conversationId;
      showContextMenu(event.clientX, event.clientY);
    });
    card.querySelectorAll('[data-card-action]').forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const action = button.dataset.cardAction;
        const freshConversation = state.conversations.find((item) => item.id === conversationId);
        if (!freshConversation) return;
        try {
          if (action === 'mute') {
            await patchConversationPrefs(conversationId, { is_muted: !isMuted(freshConversation) });
          } else if (action === 'archive') {
            await patchConversationPrefs(conversationId, { is_archived: !isArchived(freshConversation), is_muted: true });
          } else if (action === 'attach') {
            showToast('Скрепка пока без действия');
          } else if (action === 'audio-call') {
            await openConversation(conversationId);
            await startOutgoingCall(false);
          } else if (action === 'video-call') {
            await openConversation(conversationId);
            await startOutgoingCall(true);
          } else if (action === 'delete') {
            await deleteConversation(conversationId);
          }
        } catch (error) {
          showToast(error.message, 'error');
        }
      });
    });
  });
}

function renderUpkList() {
  const channels = state.conversations.filter((item) => item.kind === 'yupikey' && !isArchived(item));
  els.upkList.classList.remove('hidden');
  if (!channels.length) {
    els.upkList.innerHTML = `
      <button class="upk-channel-row create" data-upk-create="1">
        <span class="upk-row-icon">＋</span>
        <span><b>Создать UPK</b><small>Канал для постов как в Telegram</small></span>
      </button>
    `;
  } else {
    els.upkList.innerHTML = [
      ...channels.map((item) => `
        <button class="upk-channel-row ${state.activeConversationId === item.id ? 'active' : ''}" data-upk-id="${item.id}">
          <span class="upk-row-avatar">${escapeHtml(upkTitle(item).trim().charAt(0).toUpperCase() || 'U')}</span>
          <span><b>${escapeHtml(upkTitle(item))}</b><small>${item.is_owner ? 'создатель · ' : ''}${item.member_count} подписчиков</small></span>
        </button>
      `),
      `<button class="upk-channel-row create" data-upk-create="1"><span class="upk-row-icon">＋</span><span><b>Новый UPK</b><small>Создать канал</small></span></button>`
    ].join('');
  }
  els.upkList.querySelectorAll('[data-upk-id]').forEach((button) => {
    button.addEventListener('click', () => openYupiKey(Number(button.dataset.upkId)).catch((error) => showToast(error.message, 'error')));
  });
  els.upkList.querySelectorAll('[data-upk-create]').forEach((button) => {
    button.addEventListener('click', () => openCreateYupiKeyModal());
  });
}

function renderConversationLists() {
  const visible = getVisibleConversations().filter((item) => item.kind !== 'comments');
  els.panelTitle.textContent = state.panelMode === 'archive' ? 'Archive' : state.panelMode === 'upk' ? 'upk' : 'Диалоги';

  const regularVisible = state.panelMode !== 'archive' && state.panelMode !== 'upk';
  els.conversationList.classList.toggle('hidden', !regularVisible);
  els.archiveList.classList.toggle('hidden', state.panelMode !== 'archive');
  els.upkList.classList.toggle('hidden', state.panelMode !== 'upk');

  if (state.panelMode === 'upk') {
    renderUpkList();
    return;
  }

  const markup = visible.length
    ? visible.map(renderConversationCard).join('')
    : `<div class="glass-subpanel tiny-note">Ничего не найдено.</div>`;
  if (regularVisible) {
    els.conversationList.innerHTML = markup;
    bindConversationCards(els.conversationList);
  } else {
    els.archiveList.innerHTML = markup;
    bindConversationCards(els.archiveList);
  }
}


function refreshUpkSearchMatches() {
  const query = (state.upkSearch.query || '').trim().toLowerCase();
  if (!query) {
    state.upkSearch.matches = [];
    state.upkSearch.index = 0;
    return;
  }
  state.upkSearch.matches = state.upkPosts
    .filter((post) => String(post.body || '').toLowerCase().includes(query))
    .map((post) => ({ postId: post.id, body: post.body, createdAt: post.created_at }));
  if (state.upkSearch.index >= state.upkSearch.matches.length) state.upkSearch.index = Math.max(0, state.upkSearch.matches.length - 1);
}

function upkSearchSnippet(body, query) {
  const text = String(body || '').replace(/\s+/g, ' ').trim();
  const lower = text.toLowerCase();
  const idx = lower.indexOf(String(query || '').toLowerCase());
  if (idx < 0) return text.slice(0, 96);
  const start = Math.max(0, idx - 32);
  const end = Math.min(text.length, idx + query.length + 52);
  return `${start ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
}

function renderUpkSearchPanel(channel) {
  if (!els.upkSearchPanel) return;
  const visible = Boolean(channel && state.upkSearch.open);
  els.upkSearchPanel.classList.toggle('hidden', !visible);
  if (!visible) return;

  refreshUpkSearchMatches();
  if (els.upkSearchInput && document.activeElement !== els.upkSearchInput) {
    els.upkSearchInput.value = state.upkSearch.query || '';
  }

  const total = state.upkSearch.matches.length;
  els.upkSearchCount.textContent = total ? `${state.upkSearch.index + 1}/${total}` : '0/0';
  if (els.upkSearchPrevBtn) els.upkSearchPrevBtn.disabled = total < 2;
  if (els.upkSearchNextBtn) els.upkSearchNextBtn.disabled = total < 2;
  if (els.upkSearchListBtn) els.upkSearchListBtn.disabled = total === 0;

  if (els.upkSearchResults) {
    els.upkSearchResults.classList.toggle('hidden', !state.upkSearch.listOpen || !total);
    els.upkSearchResults.innerHTML = total ? state.upkSearch.matches.map((match, index) => `
      <button type="button" class="${index === state.upkSearch.index ? 'active' : ''}" data-upk-search-jump="${index}">
        <b>${formatTime(match.createdAt)}</b>
        <span>${escapeHtml(upkSearchSnippet(match.body, state.upkSearch.query))}</span>
      </button>
    `).join('') : '';
    els.upkSearchResults.querySelectorAll('[data-upk-search-jump]').forEach((button) => {
      button.addEventListener('click', () => {
        state.upkSearch.index = Number(button.dataset.upkSearchJump || 0);
        state.upkSearch.listOpen = false;
        renderUpkView();
        scrollActiveUpkSearchHit();
      });
    });
  }
}

function openUpkSearch() {
  const channel = getActiveYupiKey();
  if (!channel) {
    openCreateYupiKeyModal();
    return;
  }
  state.upkSearch.open = true;
  state.upkSearch.listOpen = false;
  renderUpkView();
  setTimeout(() => els.upkSearchInput?.focus(), 40);
}

function closeUpkSearch() {
  state.upkSearch.open = false;
  state.upkSearch.query = '';
  state.upkSearch.matches = [];
  state.upkSearch.index = 0;
  state.upkSearch.listOpen = false;
  renderUpkView();
}

function stepUpkSearch(delta) {
  refreshUpkSearchMatches();
  const total = state.upkSearch.matches.length;
  if (!total) return;
  state.upkSearch.index = (state.upkSearch.index + delta + total) % total;
  renderUpkView();
  scrollActiveUpkSearchHit();
}

function scrollActiveUpkSearchHit() {
  const match = state.upkSearch.matches[state.upkSearch.index];
  if (!match) return;
  const node = els.upkFeed?.querySelector(`[data-post-id="${match.postId}"]`);
  node?.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

function renderUpkView() {
  const channel = getActiveYupiKey();
  const hasChannel = Boolean(channel);
  els.upkEmptyState?.classList.toggle('hidden', hasChannel);
  els.upkPostForm?.classList.toggle('hidden', !(channel && channel.is_owner));
  if (els.upkCreateChannelBtn) {
    els.upkCreateChannelBtn.textContent = hasChannel ? '⌕' : '＋';
    els.upkCreateChannelBtn.title = hasChannel ? 'Поиск по каналу' : 'Создать UPK';
  }
  if (!channel) {
    setAvatar(els.upkAvatar, 'UPK', '#6a49d9');
    els.upkChannelTitle.textContent = 'UPK';
    els.upkChannelMeta.textContent = 'Канал как в Telegram';
    renderUpkSearchPanel(null);
    els.upkFeed.innerHTML = '';
    return;
  }
  renderUpkSearchPanel(channel);
  setAvatar(els.upkAvatar, upkTitle(channel), conversationAvatarColor(channel), conversationAvatarUrl(channel));
  els.upkChannelTitle.textContent = upkTitle(channel);
  els.upkChannelMeta.textContent = channel.is_owner
    ? `${channel.member_count} подписчиков · вы создатель`
    : `${channel.member_count} подписчиков · комментируйте и ставьте реакции`;
  if (!state.upkPosts.length) {
    els.upkFeed.innerHTML = `<div class="upk-empty-posts">Постов пока нет.</div>`;
    return;
  }
  const searchMatchIds = new Set(state.upkSearch.matches.map((match) => Number(match.postId)));
  const currentMatchId = Number(state.upkSearch.matches[state.upkSearch.index]?.postId || 0);
  els.upkFeed.innerHTML = state.upkPosts.map((post) => {
    const likes = post.reactions?.['👍'] || 0;
    const fire = post.reactions?.['🔥'] || 0;
    const heart = post.reactions?.['❤️'] || 0;
    const searchClass = searchMatchIds.has(Number(post.id)) ? ` search-hit${currentMatchId === Number(post.id) ? ' current-hit' : ''}` : '';
    return `
      <article class="upk-post${searchClass}" data-post-id="${post.id}">
        <div class="upk-post-head">
          <div class="avatar mini" data-upk-post-avatar="${post.id}"></div>
          <div><b>${escapeHtml(upkTitle(channel))}</b><small>${formatTime(post.created_at)} · только создатель</small></div>
        </div>
        <div class="upk-post-body">${escapeHtml(post.body).replace(/\n/g, '<br>')}</div>
        <div class="upk-post-actions">
          <button type="button" class="upk-reaction ${post.my_reaction === '👍' ? 'active' : ''}" data-reaction="👍">👍 ${likes || ''}</button>
          <button type="button" class="upk-reaction ${post.my_reaction === '🔥' ? 'active' : ''}" data-reaction="🔥">🔥 ${fire || ''}</button>
          <button type="button" class="upk-reaction ${post.my_reaction === '❤️' ? 'active' : ''}" data-reaction="❤️">❤️ ${heart || ''}</button>
          <button type="button" class="upk-comments-btn" data-comments="1">💬 Комменты ${post.comments_count || ''}</button>
        </div>
      </article>
    `;
  }).join('');
  els.upkFeed.querySelectorAll('[data-upk-post-avatar]').forEach((node) => setAvatar(node, upkTitle(channel), '#6a49d9'));
  els.upkFeed.querySelectorAll('[data-reaction]').forEach((button) => {
    button.addEventListener('click', async () => {
      const post = button.closest('[data-post-id]');
      if (!post || !channel) return;
      try {
        await toggleUpkReaction(channel.id, Number(post.dataset.postId), button.dataset.reaction);
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  });
  els.upkFeed.querySelectorAll('[data-comments]').forEach((button) => {
    button.addEventListener('click', async () => {
      const post = button.closest('[data-post-id]');
      if (!post || !channel) return;
      try {
        await openUpkComments(channel.id, Number(post.dataset.postId));
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  });
  if (state.upkSearch.open && state.upkSearch.query) {
    setTimeout(scrollActiveUpkSearchHit, 50);
  }
}


function renderCurrentPanels() {
  els.chatShell.classList.toggle('hidden', !(state.panelMode === 'chat' || state.panelMode === 'archive'));
  els.settingsView.classList.toggle('hidden', state.panelMode !== 'settings');
  els.upkView.classList.toggle('hidden', state.panelMode !== 'upk');
  els.adminConsoleView?.classList.toggle('hidden', state.panelMode !== 'console');
  if (state.panelMode === 'upk') renderUpkView();
  if (state.panelMode === 'console') renderAdminConsole();
  railActive(state.panelMode);
}

function renderChatHeader() {
  const conversation = getActiveConversation();
  if (!conversation) {
    setAvatar(els.chatAvatar, 'Y', '#8f6bff');
    els.chatTitle.textContent = 'Yupi';
    els.chatStatus.textContent = 'Выберите диалог';
    ['favoriteToggleBtn', 'muteToggleBtn', 'archiveToggleBtn', 'audioCallBtn', 'videoCallBtn'].forEach((key) => {
      els[key].disabled = true;
      els[key].classList.remove('active');
    });
    return;
  }

  const title = conversation.title;
  const color = conversationAvatarColor(conversation);
  setAvatar(els.chatAvatar, title, color, conversationAvatarUrl(conversation));
  els.chatTitle.textContent = title;
  if (conversation.kind === 'direct') {
    els.chatStatus.textContent = conversation.is_online ? 'В сети' : (conversation.other_user?.bio || 'Не в сети');
  } else {
    els.chatStatus.textContent = `${conversation.member_count} участников`;
  }

  els.favoriteToggleBtn.disabled = false;
  els.muteToggleBtn.disabled = false;
  els.archiveToggleBtn.disabled = false;
  els.audioCallBtn.disabled = conversation.kind !== 'direct';
  els.videoCallBtn.disabled = conversation.kind !== 'direct';

  els.favoriteToggleBtn.classList.toggle('active', isFavorite(conversation));
  els.muteToggleBtn.classList.toggle('active', isMuted(conversation));
  els.archiveToggleBtn.classList.toggle('active', isArchived(conversation));
}

function renderMessages() {
  const conversation = getActiveConversation();
  if (!conversation) {
    els.messageList.innerHTML = `
      <div class="empty-chat">
        <div class="empty-chat-title">Откройте чат</div>
        <div class="small-muted">Здесь появятся сообщения, звонки и вложения.</div>
      </div>
    `;
    els.messageInput.value = '';
    els.messageInput.disabled = true;
    return;
  }
  els.messageInput.disabled = false;

  if (!state.messages.length) {
    els.messageList.innerHTML = `
      <div class="empty-chat">
        <div class="empty-chat-title">Сообщений пока нет</div>
        <div class="small-muted">Напишите первое сообщение в поле ниже.</div>
      </div>
    `;
    focusComposer();
    return;
  }

  els.messageList.innerHTML = state.messages.map((message) => {
    const mine = state.me && message.sender.id === state.me.id;
    return `
      <div class="message-row ${mine ? 'me' : 'them'}">
        <div class="message-bubble">
          ${conversation.kind !== 'direct' && !mine ? `<div class="message-sender">${escapeHtml(message.sender.display_name)}</div>` : ''}
          <div>${escapeHtml(message.body)}</div>
          <div class="message-meta">${formatTime(message.created_at)}</div>
        </div>
      </div>
    `;
  }).join('');
  els.messageList.scrollTop = els.messageList.scrollHeight;
}

function renderTyping() {
  const active = getActiveConversation();
  const visible = active && state.typingConversationId === active.id;
  els.typingIndicator.classList.toggle('hidden', !visible);
}

function renderInfoShell() {
  const conversation = getActiveConversation();
  if (!conversation) {
    setAvatar(els.infoAvatar, 'Y', '#8f6bff');
    els.infoName.textContent = 'Выберите чат';
    els.infoMeta.textContent = 'Когда выбран диалог, здесь показывается карточка пользователя.';
    els.contactOnlineBadge.textContent = 'offline';
    els.infoAudioCall.disabled = true;
    els.infoVideoCall.disabled = true;
    return;
  }
  const label = conversation.title;
  setAvatar(els.infoAvatar, label, conversationAvatarColor(conversation), conversationAvatarUrl(conversation));
  els.infoName.textContent = label;
  els.infoMeta.textContent = conversation.kind === 'direct'
    ? `${conversation.other_user?.bio || 'Пользователь Yupi'}`
    : `${conversation.member_count} участников`;
  els.contactOnlineBadge.textContent = conversation.kind === 'direct' && conversation.is_online ? 'online' : conversation.kind === 'direct' ? 'offline' : 'group';
  els.infoAudioCall.disabled = conversation.kind !== 'direct';
  els.infoVideoCall.disabled = conversation.kind !== 'direct';
}

function renderChannelInfoShell() {
  if (!els.channelInfoShell) return;
  const conversation = state.conversations.find((item) => item.id === Number(state.channelInfoConversationId));
  els.channelInfoShell.classList.toggle('hidden', !conversation);
  if (!conversation) return;

  setAvatar(els.channelInfoAvatar, conversation.title, conversationAvatarColor(conversation), conversationAvatarUrl(conversation));
  els.channelInfoTitle.textContent = upkTitle(conversation);
  els.channelInfoMeta.textContent = conversation.kind === 'yupikey'
    ? `${conversation.member_count} подписчиков${conversation.is_owner ? ' · вы администратор' : ''}`
    : `${conversation.member_count} участников${conversation.is_owner ? ' · вы администратор' : ''}`;

  if (els.channelInfoNameInput) {
    els.channelInfoNameInput.value = upkTitle(conversation);
    els.channelInfoNameInput.disabled = !conversation.is_owner;
  }
  els.channelInfoOwnerTools?.classList.toggle('readonly', !conversation.is_owner);
  if (els.channelInfoAvatarUploadBtn) els.channelInfoAvatarUploadBtn.disabled = !conversation.is_owner;
  if (els.channelInfoSaveBtn) els.channelInfoSaveBtn.disabled = !conversation.is_owner;

  if (els.channelInfoMembers) {
    const members = state.channelMembers || [];
    els.channelInfoMembers.innerHTML = members.length ? members.map((member) => `
      <div class="channel-member-row">
        <div class="avatar mini" data-channel-member-avatar="${member.id}"></div>
        <div><b>${escapeHtml(member.display_name)}</b><small>${member.id === conversation.owner_id ? 'администратор' : 'подписчик'}</small></div>
      </div>
    `).join('') : '<div class="tiny-note">Список участников пока пуст.</div>';
    els.channelInfoMembers.querySelectorAll('[data-channel-member-avatar]').forEach((node) => {
      const member = members.find((item) => String(item.id) === String(node.dataset.channelMemberAvatar));
      if (member) setAvatar(node, member.display_name, member.avatar_color, member.avatar_url || '');
    });
  }
}

function ensureMusicSelected() {
  if (!state.browser.active || !browserSources[state.browser.active]) {
    state.browser.active = localStorage.getItem('yupi_music_source') || 'vk';
  }
  const source = browserSources[state.browser.active];
  state.browser.url = source.url;
  state.browser.title = source.title;
}

function renderMusicPhoneState(sourceKey, source) {
  const serviceClass = source && source.serviceClass ? source.serviceClass : sourceKey || 'music';
  const usePreview = Boolean(source && source.localPreview);
  document.body.dataset.browserMode = sourceKey || 'info';
  document.body.dataset.musicPreview = usePreview ? '1' : '0';
  document.body.dataset.musicService = serviceClass;
  if (els.browserShell) els.browserShell.dataset.musicSource = sourceKey || '';
  if (els.musicMobileBrowser) els.musicMobileBrowser.dataset.musicSource = sourceKey || '';
  if (els.browserFrame) els.browserFrame.dataset.musicSource = sourceKey || '';
  if (els.musicStatusCard) {
    els.musicStatusCard.dataset.musicSource = sourceKey || '';
    els.musicStatusCard.classList.toggle('use-preview', usePreview);
  }
  if (els.musicPreviewStage) els.musicPreviewStage.setAttribute('aria-hidden', usePreview ? 'false' : 'true');
  if (els.musicPreviewService) els.musicPreviewService.textContent = source ? source.title : 'Музыка';
  if (els.musicPreviewArt) els.musicPreviewArt.textContent = source && source.short ? source.short : '♫';
  if (els.musicPreviewArtist) els.musicPreviewArtist.textContent = source && source.previewArtist ? source.previewArtist : 'Автор';
  if (els.musicPreviewSong) els.musicPreviewSong.textContent = source && source.previewSong ? source.previewSong : 'Название';
  if (els.musicPreviewHint) els.musicPreviewHint.textContent = source && source.previewHint ? source.previewHint : 'Откройте вкладкой для входа и настоящего воспроизведения.';
}

function renderBrowserShell() {
  const sourceKey = state.browser.active;
  const source = sourceKey ? browserSources[sourceKey] : null;
  els.browserButtons.forEach((button) => button.classList.toggle('active', button.dataset.browser === sourceKey));
  if (!source) {
    renderMusicPhoneState('', null);
    els.browserShell.classList.add('hidden');
    if (els.browserFrame) {
      els.browserFrame.src = 'about:blank';
      els.browserFrame.dataset.loadedUrl = 'about:blank';
    }
    return;
  }

  renderMusicPhoneState(sourceKey, source);
  els.browserShell.classList.remove('hidden');
  els.browserTitle.textContent = source.title;
  if (els.musicMobileUrl) els.musicMobileUrl.textContent = (source.popupUrl || source.url).replace(/^https?:\/\//, '');
  if (els.browserNotice) {
    els.browserNotice.textContent = '';
    els.browserNotice.classList.add('hidden');
  }

  if (els.browserFrame) {
    // VK, Яндекс Музыка и Spotify ставят X-Frame-Options/CSP, поэтому iframe показывает грустный листочек.
    // Не грузим их внутрь вообще: оставляем красивый локальный превью-плеер и открываем реальный сайт отдельным окном.
    if (source.localPreview) {
      els.browserFrame.src = 'about:blank';
      els.browserFrame.dataset.loadedUrl = 'about:blank';
      els.browserFrame.classList.add('music-frame-disabled');
    } else {
      const nextUrl = source.embedUrl || source.url;
      els.browserFrame.classList.remove('music-frame-disabled');
      if (els.browserFrame.dataset.loadedUrl !== nextUrl) {
        els.browserFrame.src = nextUrl;
        els.browserFrame.dataset.loadedUrl = nextUrl;
      }
    }
  }

  const probe = state.browser.probes[sourceKey];
  const musicSlots = { vk: 12, yandex: 13, spotify: 14 };
  const iconSlot = musicSlots[sourceKey] || 11;
  els.musicCardIcon.dataset.mediaSlot = String(iconSlot);
  els.musicCardIcon.classList.remove('has-custom-media');
  els.musicCardIcon.style.removeProperty('--custom-icon-url');
  els.musicCardIcon.textContent = source.icon;
  setCustomIconForSlot(iconSlot, slotFileUrl(iconSlot));
  els.musicCardTitle.textContent = source.title;
  els.musicCardCopy.textContent = source.copy;
  if (els.musicTrackAuthor) els.musicTrackAuthor.textContent = source.trackAuthor || 'автор';
  if (els.musicTrackTitle) els.musicTrackTitle.textContent = source.trackTitle || source.title || 'Название';
  if (els.musicPlayBtn) els.musicPlayBtn.textContent = state.musicPlaying ? '▌▌' : '▶';
  if (els.musicProgressFill) els.musicProgressFill.style.width = state.musicPlaying ? '36%' : '18%';
  els.musicStatusCard.classList.toggle('is-error', Boolean(probe && !probe.ok));
  els.musicStatusCard.classList.toggle('is-ok', Boolean(probe && probe.ok));
  if (probe) {
    const code = probe.status ? `HTTP ${probe.status}. ` : '';
    els.musicStatusText.textContent = `${code}${probe.message}`;
  } else {
    els.musicStatusText.textContent = 'iframe больше не грузим: сайты музыки его блокируют. Жмите «Открыть сервис» или кнопку ↗.';
  }
}

function renderIncomingCallToast() {
  if (!els.incomingCallToast) return;
  const pending = state.pendingIncomingCall;
  els.incomingCallToast.classList.toggle('hidden', !pending);
  if (!pending) return;
  const fromUser = pending.from_user || {};
  if (els.incomingCallToastAvatar) {
    setAvatar(els.incomingCallToastAvatar, fromUser.display_name || 'Yupi', fromUser.avatar_color || '#8f6bff', fromUser.avatar_url || '');
  }
  if (els.incomingCallToastName) els.incomingCallToastName.textContent = fromUser.display_name || 'Входящий звонок';
  if (els.incomingCallToastMeta) {
    els.incomingCallToastMeta.textContent = pending.video ? 'Видеозвонок в Yupi' : 'Аудиозвонок в Yupi';
  }
}

function renderCallShell() {
  renderIncomingCallToast();
  const showCall = Boolean(state.pendingIncomingCall || state.call.active);
  els.callShell.classList.toggle('hidden', !showCall);
  els.incomingCallCard.classList.toggle('hidden', !state.pendingIncomingCall);
  els.activeCallCard.classList.toggle('hidden', !state.call.active);

  if (state.pendingIncomingCall) {
    const fromUser = state.pendingIncomingCall.from_user;
    setAvatar(els.incomingCallAvatar, fromUser.display_name, fromUser.avatar_color, fromUser.avatar_url || '');
    els.incomingCallName.textContent = fromUser.display_name;
    els.incomingCallMeta.textContent = state.pendingIncomingCall.video ? 'Видеозвонок' : 'Аудиозвонок';
  }

  if (state.call.active) {
    const peerName = state.call.targetUser ? state.call.targetUser.display_name : 'Звонок';
    const statusMap = {
      ringing: 'звонок идёт',
      connecting: 'соединение',
      connected: 'зашифровано',
      reconnecting: 'переподключение',
      'screen-sharing': 'демонстрация экрана',
    };
    const statusText = statusMap[state.call.status] || 'зашифровано';
    els.callStageTitle.textContent = `${peerName} · ${statusText}`;
    els.callMicBtn.classList.toggle('active', state.call.muted);
    els.callCameraBtn.classList.toggle('active', state.call.cameraOff);
    els.callSoundBtn.classList.toggle('active', state.call.speakerMuted);
    els.callScreenBtn.classList.toggle('active', state.call.sharingScreen);
  }
}

function renderUtilityPane() {
  const inCallState = Boolean(state.pendingIncomingCall || state.call.active);
  document.body.classList.toggle('is-in-call', inCallState);
  document.body.dataset.utilityFocus = inCallState ? state.utilityFocus : 'normal';
  els.utilitySwapBtn?.classList.toggle('hidden', !inCallState);

  if (inCallState) {
    els.infoShell.classList.add('hidden');
    els.channelInfoShell?.classList.add('hidden');
    if (!state.utilityFocus) state.utilityFocus = 'call';

    if (state.utilityFocus === 'music') {
      ensureMusicSelected();
      renderBrowserShell();
      els.callShell.classList.add('compact-call');
      if (els.utilitySwapBtn) els.utilitySwapBtn.textContent = '📞';
    } else {
      els.browserShell.classList.add('hidden');
      els.callShell.classList.remove('compact-call');
      if (els.utilitySwapBtn) els.utilitySwapBtn.textContent = '♫';
    }
    renderCallShell();
    return;
  }

  state.utilityFocus = 'call';
  els.callShell.classList.add('hidden');
  els.callShell.classList.remove('compact-call');
  renderBrowserShell();
  if (state.browser.active) {
    els.infoShell.classList.add('hidden');
    els.channelInfoShell?.classList.add('hidden');
  } else if (state.channelInfoConversationId) {
    els.infoShell.classList.add('hidden');
    renderChannelInfoShell();
  } else {
    els.channelInfoShell?.classList.add('hidden');
    els.infoShell.classList.remove('hidden');
    renderInfoShell();
  }
}

function syncFigmaLayoutState() {
  const activeConversation = getActiveConversation();
  const chatMode = state.panelMode === 'chat' || state.panelMode === 'archive';
  document.body.classList.toggle('has-active-chat', Boolean(activeConversation && chatMode && activeConversation.kind !== 'yupikey'));
  document.body.classList.toggle('has-active-upk', state.panelMode === 'upk');
  document.body.classList.toggle('has-open-upk', Boolean(state.panelMode === 'upk' && activeConversation && activeConversation.kind === 'yupikey'));
  document.body.dataset.upkOpen = state.panelMode === 'upk' && activeConversation && activeConversation.kind === 'yupikey' ? '1' : '0';
  document.body.dataset.panelMode = state.panelMode || 'chat';
  document.body.dataset.browserMode = state.browser.active || 'info';
}

function applyServerInfo(serverInfo) {
  state.serverInfo = serverInfo || null;
  if (els.demoHint) {
    els.demoHint.classList.toggle('hidden', !!(serverInfo && serverInfo.demo_mode === false));
  }
}

function renderAll() {
  syncFigmaLayoutState();
  renderProfile();
  renderStories();
  renderCurrentPanels();
  renderConversationLists();
  renderChatHeader();
  renderMessages();
  renderTyping();
  renderUtilityPane();
  syncFigmaLayoutState();
}

async function refreshConversations(preserve = true) {
  const conversations = await api('/api/conversations');
  const oldActive = preserve ? state.activeConversationId : null;
  state.conversations = conversations;
  if (oldActive && conversations.some((item) => item.id === oldActive)) {
    state.activeConversationId = oldActive;
  } else if (state.activeConversationId && !conversations.some((item) => item.id === state.activeConversationId)) {
    state.activeConversationId = null;
    state.messages = [];
  }
}

async function refreshMessages() {
  const conversation = getActiveConversation();
  if (!conversation || conversation.kind === 'yupikey') {
    state.messages = [];
    renderMessages();
    return;
  }
  state.messages = await api(`/api/conversations/${conversation.id}/messages?limit=100`);
  renderMessages();
}

async function openConversation(conversationId) {
  const targetId = Number(conversationId);
  let conversation = state.conversations.find((item) => item.id === targetId);
  if (!conversation) {
    await refreshConversations(true);
    conversation = state.conversations.find((item) => item.id === targetId);
  }
  if (!conversation) {
    showToast('Чат пока не найден. Обновляю список...', 'error');
    await refreshConversations(false);
    return;
  }
  if (conversation.kind === 'yupikey') {
    await openYupiKey(targetId);
    return;
  }
  state.panelMode = isArchived(conversation) ? 'archive' : 'chat';
  state.activeConversationId = targetId;
  state.messages = [];
  renderAll();
  await refreshMessages();
  renderChatHeader();
  focusComposer();
}

async function openYupiKey(conversationId) {
  state.panelMode = 'upk';
  state.activeConversationId = conversationId;
  await refreshYupiKeyPosts();
  renderAll();
}

async function refreshYupiKeyPosts() {
  const channel = getActiveYupiKey();
  if (!channel) {
    state.upkPosts = [];
    return;
  }
  state.upkPosts = await api(`/api/yupikeys/${channel.id}/posts`);
}

async function createUpkPost() {
  const channel = getActiveYupiKey();
  if (!channel) return;
  const body = els.upkPostInput.value.trim();
  if (!body) return;
  const post = await api(`/api/yupikeys/${channel.id}/posts`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  });
  state.upkPosts = [post, ...state.upkPosts.filter((item) => item.id !== post.id)];
  els.upkPostInput.value = '';
  renderUpkView();
  showToast('Пост опубликован');
}

async function toggleUpkReaction(conversationId, postId, reaction) {
  const post = await api(`/api/yupikeys/${conversationId}/posts/${postId}/reaction`, {
    method: 'POST',
    body: JSON.stringify({ reaction }),
  });
  state.upkPosts = state.upkPosts.map((item) => item.id === post.id ? post : item);
  renderUpkView();
}

async function openUpkComments(conversationId, postId) {
  const conversation = await api(`/api/yupikeys/${conversationId}/posts/${postId}/comments`, { method: 'POST' });
  const idx = state.conversations.findIndex((item) => item.id === conversation.id);
  if (idx >= 0) state.conversations[idx] = conversation;
  else state.conversations.unshift(conversation);
  state.panelMode = 'chat';
  state.activeConversationId = conversation.id;
  await refreshMessages();
  renderAll();
}

function openCreateYupiKeyModal() {
  setCreateView('yupikey');
  openModal(els.newChatModal);
}

async function patchConversationPrefs(conversationId, updates) {
  const result = await api(`/api/conversations/${conversationId}/prefs`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
  const idx = state.conversations.findIndex((item) => item.id === conversationId);
  if (idx >= 0) state.conversations[idx] = result.conversation;
  renderAll();
}

async function linkProfileUpk(conversationId) {
  state.me = await api('/api/me/upk-link', {
    method: 'POST',
    body: JSON.stringify({ conversation_id: Number(conversationId || 0) }),
  });
  state.profileUpkPickerOpen = false;
  renderAll();
  showToast(conversationId ? 'UPK привязан к профилю' : 'UPK отвязан от профиля');
}

async function updateChannelInfo(conversationId, updates) {
  const result = await api(`/api/conversations/${conversationId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
  const idx = state.conversations.findIndex((item) => item.id === conversationId);
  if (idx >= 0) state.conversations[idx] = result.conversation;
  renderAll();
  showToast('Канал сохранён');
}

async function uploadChannelAvatar(conversationId, file) {
  if (!file) return;
  const dataUrl = await readFileAsDataUrl(file);
  const result = await api(`/api/conversations/${conversationId}/avatar`, {
    method: 'POST',
    body: JSON.stringify({ filename: file.name, data_url: dataUrl }),
  });
  const idx = state.conversations.findIndex((item) => item.id === conversationId);
  if (idx >= 0) state.conversations[idx] = result.conversation;
  renderAll();
  showToast('Аватар канала обновлён');
}

async function openChannelInfo(conversationId) {
  const conversation = state.conversations.find((item) => item.id === Number(conversationId));
  if (!conversation || conversation.kind === 'direct') return;
  state.channelInfoConversationId = conversation.id;
  state.browser.active = null;
  try {
    state.channelMembers = await api(`/api/conversations/${conversation.id}/members`);
  } catch (error) {
    state.channelMembers = [];
    showToast(error.message || 'Не удалось загрузить участников', 'error');
  }
  renderUtilityPane();
}

function closeChannelInfo() {
  state.channelInfoConversationId = null;
  state.channelMembers = [];
  renderUtilityPane();
}

async function deleteConversation(conversationId) {
  await api(`/api/conversations/${conversationId}`, { method: 'DELETE' });
  state.conversations = state.conversations.filter((item) => item.id !== conversationId);
  if (state.activeConversationId === conversationId) {
    state.activeConversationId = null;
    state.messages = [];
  }
  renderAll();
}

async function doLogin(formData) {
  const payload = Object.fromEntries(formData.entries());
  const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
  state.token = data.token;
  state.me = data.user;
  localStorage.setItem('yupi_token', state.token);
  await bootstrapApp();
}

async function doRegister(formData) {
  const payload = Object.fromEntries(formData.entries());
  const data = await api('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) });
  state.token = data.token;
  state.me = data.user;
  localStorage.setItem('yupi_token', state.token);
  await bootstrapApp();
}

async function bootstrapApp() {
  if (!state.token) {
    switchScreen(els.auth);
    return;
  }
  try {
    state.me = await api('/api/me');
    await refreshConversations(false);
    // Не открываем первый чат автоматически: иначе стартовый список получает
    // состояние has-active-chat и CSS начинает накладывать панели друг на друга.
    if (state.activeConversationId && state.conversations.some((item) => item.id === state.activeConversationId)) {
      await refreshMessages();
    } else {
      state.activeConversationId = null;
      state.messages = [];
    }
    connectWs();
    switchScreen(els.app);
    renderAll();
  } catch (error) {
    localStorage.removeItem('yupi_token');
    state.token = '';
    switchScreen(els.auth);
    showToast(error.message || 'Сессия истекла', 'error');
  }
}

function searchUsersGeneric(query) {
  return api(`/api/users/search?q=${encodeURIComponent(query || '')}`);
}

function userItemMarkup(user, actionLabel, actionName, selectedIds = []) {
  const selected = selectedIds.includes(user.id);
  const subtitle = user.bio || `Yupi ID ${user.id}`;
  return `
    <div class="user-item" data-user-id="${user.id}">
      <div class="avatar" data-user-avatar="${user.id}"></div>
      <div class="user-item-copy">
        <div class="user-item-name">${escapeHtml(user.display_name)}</div>
        <div class="small-muted">${escapeHtml(subtitle)}</div>
      </div>
      <button class="icon-pill tiny ${selected ? 'active' : ''}" data-user-action="${actionName}">
        ${selected ? '✓' : actionLabel}
      </button>
    </div>
  `;
}

function hydrateUserItems(host) {
  host.querySelectorAll('[data-user-avatar]').forEach((node) => {
    const id = Number(node.dataset.userAvatar);
    const allUsers = [
      ...state.searches.direct,
      ...state.searches.group,
      ...state.searches.yupikey,
      ...state.selectedGroupUsers,
      ...state.selectedYupiKeyUsers,
    ];
    const user = allUsers.find((item) => item.id === id);
    if (user) setAvatar(node, user.display_name, user.avatar_color, user.avatar_url || '');
  });
}

async function runDirectSearch(query) {
  state.searches.direct = await searchUsersGeneric(query);
  els.userSearchResults.innerHTML = state.searches.direct.length
    ? state.searches.direct.map((user) => userItemMarkup(user, 'Открыть', 'direct-open')).join('')
    : '<div class="glass-subpanel tiny-note">Пользователь не найден.</div>';
  hydrateUserItems(els.userSearchResults);
  els.userSearchResults.querySelectorAll('[data-user-action="direct-open"]').forEach((button) => {
    button.addEventListener('click', async () => {
      const userId = Number(button.closest('[data-user-id]').dataset.userId);
      await createDirectChat(userId);
    });
  });
}

function renderSelectedUsers(host, users, removeHandlerName) {
  host.innerHTML = users.map((user) => `
    <span class="selected-pill" data-selected-user-id="${user.id}">
      ${escapeHtml(user.display_name)}
      <button type="button" data-remove-name="${removeHandlerName}">✕</button>
    </span>
  `).join('');
}

function bindSelectedUsers(host, callback) {
  host.querySelectorAll('[data-selected-user-id]').forEach((pill) => {
    const userId = Number(pill.dataset.selectedUserId);
    pill.querySelector('button').addEventListener('click', () => callback(userId));
  });
}

async function runGroupSearch(query, mode) {
  const key = mode === 'group' ? 'group' : 'yupikey';
  const selected = mode === 'group' ? state.selectedGroupUsers : state.selectedYupiKeyUsers;
  state.searches[key] = await searchUsersGeneric(query);
  const host = mode === 'group' ? els.groupSearchResults : els.yupiKeySearchResults;
  host.innerHTML = state.searches[key].length
    ? state.searches[key].map((user) => userItemMarkup(user, '+', 'pick-user', selected.map((item) => item.id))).join('')
    : '<div class="glass-subpanel tiny-note">Пользователь не найден.</div>';
  hydrateUserItems(host);
  host.querySelectorAll('[data-user-action="pick-user"]').forEach((button) => {
    button.addEventListener('click', () => {
      const userId = Number(button.closest('[data-user-id]').dataset.userId);
      const user = state.searches[key].find((item) => item.id === userId);
      if (!user) return;
      const list = mode === 'group' ? state.selectedGroupUsers : state.selectedYupiKeyUsers;
      const exists = list.some((item) => item.id === userId);
      if (exists) {
        const next = list.filter((item) => item.id !== userId);
        if (mode === 'group') state.selectedGroupUsers = next;
        else state.selectedYupiKeyUsers = next;
      } else {
        list.push(user);
      }
      renderSelectedAreas();
      runGroupSearch(query, mode);
    });
  });
}

function renderSelectedAreas() {
  renderSelectedUsers(els.groupSelectedUsers, state.selectedGroupUsers, 'group-remove');
  bindSelectedUsers(els.groupSelectedUsers, (userId) => {
    state.selectedGroupUsers = state.selectedGroupUsers.filter((item) => item.id !== userId);
    renderSelectedAreas();
    runGroupSearch(els.groupSearchInput.value, 'group');
  });
  renderSelectedUsers(els.yupiKeySelectedUsers, state.selectedYupiKeyUsers, 'yupikey-remove');
  bindSelectedUsers(els.yupiKeySelectedUsers, (userId) => {
    state.selectedYupiKeyUsers = state.selectedYupiKeyUsers.filter((item) => item.id !== userId);
    renderSelectedAreas();
    runGroupSearch(els.yupiKeySearchInput.value, 'yupikey');
  });
}

function openModal(node) {
  node.classList.remove('hidden');
}

function closeModal(node) {
  node.classList.add('hidden');
}

async function createDirectChat(userId) {
  const conversation = await api('/api/conversations/direct', {
    method: 'POST',
    body: JSON.stringify({ user_id: userId }),
  });
  ensureConversationInState(conversation);
  state.panelMode = 'chat';
  state.activeConversationId = conversation.id;
  state.messages = [];
  closeModal(els.newChatModal);
  renderAll();
  focusComposer();
  await refreshConversations(true);
  await openConversation(conversation.id);
}

async function createGroup(mode) {
  const title = mode === 'group' ? els.groupTitleInput.value.trim() : els.yupiKeyTitleInput.value.trim();
  const users = mode === 'group' ? state.selectedGroupUsers : state.selectedYupiKeyUsers;
  if (!title) {
    showToast('Введите название', 'error');
    return;
  }
  if (mode === 'group' && !users.length) {
    showToast('Добавьте хотя бы одного участника', 'error');
    return;
  }
  const conversation = await api('/api/conversations/group', {
    method: 'POST',
    body: JSON.stringify({
      title,
      member_ids: users.map((item) => item.id),
      mode,
    }),
  });
  closeModal(els.newChatModal);
  state.selectedGroupUsers = [];
  state.selectedYupiKeyUsers = [];
  renderSelectedAreas();
  await refreshConversations(false);
  await openConversation(conversation.id);
}

function showContextMenu(x, y) {
  const menu = els.contextMenu;
  menu.classList.remove('hidden');
  const maxX = window.innerWidth - menu.offsetWidth - 8;
  const maxY = window.innerHeight - menu.offsetHeight - 8;
  menu.style.left = `${Math.max(8, Math.min(x, maxX))}px`;
  menu.style.top = `${Math.max(8, Math.min(y, maxY))}px`;
}

function hideContextMenu() {
  els.contextMenu.classList.add('hidden');
  state.contextConversationId = null;
}

function sendWs(payload) {
  if (state.ws && state.ws.readyState === WebSocket.OPEN) {
    state.ws.send(JSON.stringify(payload));
  }
}

function updatePresence(userId, online) {
  state.conversations = state.conversations.map((item) => {
    if (item.other_user && item.other_user.id === userId) {
      return { ...item, is_online: online };
    }
    return item;
  });
  renderAll();
}

function handleIncomingMessage(data) {
  const { conversation_id: conversationId, message } = data;
  const active = Number(state.activeConversationId) === Number(conversationId);
  const conversation = state.conversations.find((item) => Number(item.id) === Number(conversationId));

  if (active) {
    upsertMessage(message);
    renderMessages();
  }

  refreshConversations(true).then(() => {
    renderConversationLists();
    renderChatHeader();
  }).catch(() => {});
  if (message.sender.id !== state.me.id && (!conversation || !isMuted(conversation))) {
    showToast(`${message.sender.display_name}: ${message.body}`);
  }
}

function handleTyping(data) {
  if (data.conversation_id !== state.activeConversationId) return;
  state.typingConversationId = data.conversation_id;
  renderTyping();
  clearTimeout(state.typingTimer);
  state.typingTimer = setTimeout(() => {
    state.typingConversationId = null;
    renderTyping();
  }, 1400);
}

function connectWs() {
  if (!state.token) return;
  if (state.ws && [WebSocket.OPEN, WebSocket.CONNECTING].includes(state.ws.readyState)) return;

  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  state.ws = new WebSocket(`${protocol}://${window.location.host}/ws?token=${encodeURIComponent(state.token)}`);

  state.ws.addEventListener('message', async (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'message:new') {
      handleIncomingMessage(data);
      return;
    }
    if (data.type === 'conversation:refresh') {
      await refreshConversations();
      renderAll();
      return;
    }
    if (data.type === 'yupikey:post' || data.type === 'yupikey:reaction') {
      if (data.conversation_id === state.activeConversationId && state.panelMode === 'upk') {
        await refreshYupiKeyPosts();
        renderAll();
      }
      return;
    }
    if (data.type === 'typing') {
      handleTyping(data);
      return;
    }
    if (data.type === 'presence:update') {
      updatePresence(data.user_id, data.online);
      return;
    }
    if (typeof data.type === 'string' && data.type.startsWith('call:')) {
      await handleCallSignal(data);
    }
  });

  state.ws.addEventListener('close', () => {
    setTimeout(() => {
      if (state.token) connectWs();
    }, 2500);
  });
}

function getCallTargetConversation() {
  const conversation = getActiveConversation();
  if (!conversation || conversation.kind !== 'direct' || !conversation.other_user) return null;
  return conversation;
}

function createCallId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `call_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function baseCallState() {
  return {
    active: false,
    callId: '',
    status: 'idle',
    video: false,
    peer: null,
    localStream: null,
    remoteStream: null,
    targetUser: null,
    targetConversationId: null,
    muted: false,
    speakerMuted: false,
    cameraOff: false,
    sharingScreen: false,
    remoteSharingScreen: false,
    screenStream: null,
    screenSender: null,
    pendingIce: [],
    reconnectTimer: null,
  };
}

function sendCallSignal(type, targetUserId, conversationId, payload = null, extra = {}) {
  sendWs({
    type,
    target_user_id: targetUserId,
    conversation_id: conversationId,
    call_id: extra.callId || state.call.callId || state.pendingIncomingCall?.call_id || '',
    video: Boolean(extra.video ?? state.call.video),
    payload,
  });
}

function callMatchesActive(data) {
  return Boolean(state.call.callId && data.call_id && state.call.callId === data.call_id);
}

function queueEarlyIce(callId, candidate) {
  if (!callId || !candidate) return;
  if (!state.earlyCallIce[callId]) state.earlyCallIce[callId] = [];
  state.earlyCallIce[callId].push(candidate);
}

async function flushQueuedIce() {
  if (!state.call.peer) return;
  const pending = state.call.pendingIce.splice(0);
  for (const candidate of pending) {
    try {
      await state.call.peer.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (_) {}
  }
}

async function addRemoteIceCandidate(candidate) {
  if (!candidate) return;
  const remoteReady = Boolean(state.call.peer?.remoteDescription?.type);
  if (!state.call.peer || !remoteReady) {
    state.call.pendingIce.push(candidate);
    return;
  }
  try {
    await state.call.peer.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (_) {
    state.call.pendingIce.push(candidate);
  }
}

function appendEarlyIceToPending(callId) {
  const early = state.earlyCallIce[callId] || [];
  if (early.length) state.call.pendingIce.push(...early);
  delete state.earlyCallIce[callId];
}

async function getCallMedia(video) {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('Браузер не дал доступ к микрофону. Откройте Yupi через localhost или HTTPS.');
  }
  return navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
    video: Boolean(video),
  });
}

async function createPeerConnection(targetUserId, conversationId, callId) {
  const peer = new RTCPeerConnection(rtcConfig);
  state.call.peer = peer;
  state.call.remoteStream = new MediaStream();
  els.remoteVideo.srcObject = state.call.remoteStream;
  els.remoteVideo.muted = Boolean(state.call.speakerMuted);
  els.remoteVideo.volume = state.call.speakerMuted ? 0 : 1;

  peer.onicecandidate = (event) => {
    if (event.candidate) {
      sendCallSignal('call:ice', targetUserId, conversationId, event.candidate, { callId });
    }
  };

  peer.ontrack = (event) => {
    const streams = event.streams?.length ? event.streams : [new MediaStream([event.track])];
    streams[0].getTracks().forEach((track) => {
      if (!state.call.remoteStream.getTracks().some((item) => item.id === track.id)) {
        state.call.remoteStream.addTrack(track);
      }
    });
    els.remoteVideo.srcObject = state.call.remoteStream;
    els.remoteVideo.play?.().catch(() => {});
  };

  peer.oniceconnectionstatechange = () => {
    const iceState = peer.iceConnectionState;
    if (['connected', 'completed'].includes(iceState)) {
      state.call.status = 'connected';
      renderCallShell();
      return;
    }
    if (iceState === 'disconnected') {
      state.call.status = 'reconnecting';
      renderCallShell();
      clearTimeout(state.call.reconnectTimer);
      state.call.reconnectTimer = setTimeout(() => {
        if (state.call.peer === peer && peer.iceConnectionState === 'disconnected') {
          resetCallState(false).catch(() => {});
        }
      }, 12000);
      return;
    }
    if (['failed', 'closed'].includes(iceState)) {
      resetCallState(false).catch(() => {});
    }
  };

  peer.onconnectionstatechange = () => {
    if (['connected'].includes(peer.connectionState)) {
      state.call.status = 'connected';
      renderCallShell();
    } else if (peer.connectionState === 'failed') {
      resetCallState(false).catch(() => {});
    }
  };
}

function suspendBrowserForCall() {
  state.utilityFocus = 'call';
}

function restoreBrowserAfterCall() {
  state.utilityFocus = 'call';
}

async function startOutgoingCall(video) {
  const conversation = getCallTargetConversation();
  if (!conversation) {
    showToast('Звонки доступны только в личном чате', 'error');
    return;
  }
  try {
    await resetCallState(false);
    suspendBrowserForCall();
    const callId = createCallId();
    state.call = { ...baseCallState(), active: true, callId, status: 'ringing', video: Boolean(video), targetUser: conversation.other_user, targetConversationId: conversation.id };
    renderUtilityPane();

    state.call.localStream = await getCallMedia(Boolean(video));
    els.localVideo.srcObject = state.call.localStream;
    await createPeerConnection(conversation.other_user.id, conversation.id, callId);
    state.call.localStream.getTracks().forEach((track) => state.call.peer.addTrack(track, state.call.localStream));

    const offer = await state.call.peer.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: Boolean(video) });
    await state.call.peer.setLocalDescription(offer);
    sendCallSignal('call:offer', conversation.other_user.id, conversation.id, state.call.peer.localDescription, { callId, video: Boolean(video) });
    renderUtilityPane();
  } catch (error) {
    showToast(error.message || 'Не удалось начать звонок', 'error');
    await resetCallState(false);
  }
}

async function handleCallSignal(data) {
  if (data.type === 'call:offer') {
    if (state.call.active || state.pendingIncomingCall) {
      sendCallSignal('call:busy', data.from_user.id, data.conversation_id, { reason: 'busy' }, { callId: data.call_id, video: Boolean(data.video) });
      return;
    }
    const queuedIce = state.earlyCallIce[data.call_id] || [];
    delete state.earlyCallIce[data.call_id];
    state.pendingIncomingCall = { ...data, queuedIce };
    suspendBrowserForCall();
    renderUtilityPane();
    showToast(`Входящий звонок от ${data.from_user?.display_name || 'Yupi'}`);
    return;
  }

  if (data.type === 'call:answer') {
    if (!state.call.peer || !callMatchesActive(data)) return;
    await state.call.peer.setRemoteDescription(new RTCSessionDescription(data.payload));
    state.call.status = 'connecting';
    appendEarlyIceToPending(data.call_id);
    await flushQueuedIce();
    renderUtilityPane();
    return;
  }

  if (data.type === 'call:ice') {
    if (state.pendingIncomingCall && state.pendingIncomingCall.call_id === data.call_id) {
      state.pendingIncomingCall.queuedIce = state.pendingIncomingCall.queuedIce || [];
      state.pendingIncomingCall.queuedIce.push(data.payload);
      return;
    }
    if (!state.call.peer || !callMatchesActive(data)) {
      queueEarlyIce(data.call_id, data.payload);
      return;
    }
    await addRemoteIceCandidate(data.payload);
    return;
  }

  if (data.type === 'call:renegotiate-offer') {
    if (!state.call.peer || !callMatchesActive(data)) return;
    const description = data.payload?.description || data.payload;
    if (!description) return;
    await state.call.peer.setRemoteDescription(new RTCSessionDescription(description));
    appendEarlyIceToPending(data.call_id);
    await flushQueuedIce();
    const answer = await state.call.peer.createAnswer();
    await state.call.peer.setLocalDescription(answer);
    state.call.remoteSharingScreen = Boolean(data.payload?.sharing_screen);
    state.call.status = state.call.remoteSharingScreen ? 'screen-sharing' : 'connected';
    sendCallSignal(
      'call:renegotiate-answer',
      data.from_user.id,
      data.conversation_id,
      { description: state.call.peer.localDescription, reason: data.payload?.reason || '' },
      { callId: data.call_id, video: Boolean(data.video || state.call.video) }
    );
    renderUtilityPane();
    return;
  }

  if (data.type === 'call:renegotiate-answer') {
    if (!state.call.peer || !callMatchesActive(data)) return;
    const description = data.payload?.description || data.payload;
    if (!description) return;
    await state.call.peer.setRemoteDescription(new RTCSessionDescription(description));
    appendEarlyIceToPending(data.call_id);
    await flushQueuedIce();
    state.call.status = state.call.sharingScreen ? 'screen-sharing' : 'connected';
    renderUtilityPane();
    return;
  }

  if (data.type === 'call:screen-state') {
    if (!callMatchesActive(data)) return;
    state.call.remoteSharingScreen = Boolean(data.payload?.sharing_screen);
    state.call.status = state.call.remoteSharingScreen || state.call.sharingScreen ? 'screen-sharing' : 'connected';
    renderCallShell();
    return;
  }

  if (data.type === 'call:busy') {
    showToast(`${data.from_user.display_name} сейчас занят`, 'error');
    await resetCallState(false);
    return;
  }

  if (data.type === 'call:end') {
    const isCurrent = callMatchesActive(data) || state.pendingIncomingCall?.call_id === data.call_id || !data.call_id;
    if (!isCurrent) return;
    showToast(`Звонок завершен: ${data.from_user.display_name}`);
    await resetCallState(false);
  }
}

async function acceptIncomingCall() {
  if (!state.pendingIncomingCall) return;
  const data = state.pendingIncomingCall;
  try {
    const callId = data.call_id || createCallId();
    state.call = { ...baseCallState(), active: true, callId, status: 'connecting', video: Boolean(data.video), targetUser: data.from_user, targetConversationId: data.conversation_id };
    state.call.pendingIce.push(...(data.queuedIce || []));
    state.pendingIncomingCall = null;
    renderUtilityPane();

    state.call.localStream = await getCallMedia(Boolean(data.video));
    els.localVideo.srcObject = state.call.localStream;
    await createPeerConnection(data.from_user.id, data.conversation_id, callId);
    state.call.localStream.getTracks().forEach((track) => state.call.peer.addTrack(track, state.call.localStream));

    await state.call.peer.setRemoteDescription(new RTCSessionDescription(data.payload));
    appendEarlyIceToPending(callId);
    await flushQueuedIce();

    const answer = await state.call.peer.createAnswer();
    await state.call.peer.setLocalDescription(answer);
    sendCallSignal('call:answer', data.from_user.id, data.conversation_id, state.call.peer.localDescription, { callId, video: Boolean(data.video) });
    renderUtilityPane();
  } catch (error) {
    showToast(error.message || 'Не удалось принять звонок', 'error');
    if (data?.from_user?.id) {
      sendCallSignal('call:end', data.from_user.id, data.conversation_id, { reason: 'media-error' }, { callId: data.call_id, video: Boolean(data.video) });
    }
    await resetCallState(false);
  }
}

async function rejectIncomingCall() {
  if (state.pendingIncomingCall) {
    const pending = state.pendingIncomingCall;
    sendCallSignal('call:end', pending.from_user.id, pending.conversation_id, { reason: 'rejected' }, { callId: pending.call_id, video: Boolean(pending.video) });
  }
  state.pendingIncomingCall = null;
  restoreBrowserAfterCall();
  renderUtilityPane();
}

async function toggleMic() {
  if (!state.call.localStream) return;
  state.call.muted = !state.call.muted;
  state.call.localStream.getAudioTracks().forEach((track) => {
    track.enabled = !state.call.muted;
  });
  renderCallShell();
}

async function toggleSound() {
  state.call.speakerMuted = !state.call.speakerMuted;
  els.remoteVideo.muted = state.call.speakerMuted;
  els.remoteVideo.volume = state.call.speakerMuted ? 0 : 1;
  if (!state.call.speakerMuted) els.remoteVideo.play?.().catch(() => {});
  renderCallShell();
}

async function toggleCamera() {
  if (!state.call.localStream) return;
  const videoTracks = state.call.localStream.getVideoTracks();
  if (!videoTracks.length) {
    showToast('В этом звонке камера не была включена');
    return;
  }
  state.call.cameraOff = !state.call.cameraOff;
  videoTracks.forEach((track) => {
    track.enabled = !state.call.cameraOff;
  });
  renderCallShell();
}

function getVideoSender() {
  return state.call.peer?.getSenders().find((item) => item.track && item.track.kind === 'video') || null;
}

function getCallSignalTarget() {
  if (!state.call.targetUser || !state.call.targetConversationId) return null;
  return {
    userId: state.call.targetUser.id,
    conversationId: state.call.targetConversationId,
  };
}

function waitForStableSignaling(peer, timeoutMs = 4500) {
  if (!peer || peer.signalingState === 'stable') return Promise.resolve();
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      peer.removeEventListener('signalingstatechange', onChange);
      resolve();
    };
    const onChange = () => {
      if (peer.signalingState === 'stable') finish();
    };
    peer.addEventListener('signalingstatechange', onChange);
    setTimeout(finish, timeoutMs);
  });
}

async function renegotiateCall(reason, extraPayload = {}) {
  const target = getCallSignalTarget();
  const peer = state.call.peer;
  if (!target || !peer || peer.connectionState === 'closed') return false;
  await waitForStableSignaling(peer);
  if (peer.signalingState !== 'stable') return false;

  state.call.status = reason === 'screen-start' ? 'screen-sharing' : 'connecting';
  const offer = await peer.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
  await peer.setLocalDescription(offer);
  sendCallSignal(
    'call:renegotiate-offer',
    target.userId,
    target.conversationId,
    {
      description: peer.localDescription,
      reason,
      sharing_screen: state.call.sharingScreen,
      ...extraPayload,
    },
    { callId: state.call.callId, video: Boolean(state.call.video || state.call.sharingScreen) }
  );
  renderCallShell();
  return true;
}

function notifyScreenState(sharing) {
  const target = getCallSignalTarget();
  if (!target) return;
  sendCallSignal(
    'call:screen-state',
    target.userId,
    target.conversationId,
    { sharing_screen: Boolean(sharing) },
    { callId: state.call.callId, video: Boolean(state.call.video || sharing) }
  );
}

async function stopScreenShare() {
  if (!state.call.sharingScreen) return;
  const peer = state.call.peer;
  const sender = state.call.screenSender || getVideoSender();

  if (state.call.screenStream) {
    state.call.screenStream.getTracks().forEach((track) => track.stop());
  }
  state.call.screenStream = null;
  state.call.screenSender = null;
  state.call.sharingScreen = false;

  if (state.call.video) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
      const cameraTrack = stream.getVideoTracks()[0];
      const oldTracks = state.call.localStream ? state.call.localStream.getVideoTracks() : [];
      oldTracks.forEach((track) => {
        state.call.localStream.removeTrack(track);
        track.stop();
      });
      state.call.localStream.addTrack(cameraTrack);
      if (sender) await sender.replaceTrack(cameraTrack);
      els.localVideo.srcObject = state.call.localStream;
      notifyScreenState(false);
    } catch (error) {
      if (sender) {
        try { await sender.replaceTrack(null); } catch (_) {}
      }
      notifyScreenState(false);
    }
  } else if (peer && sender) {
    try {
      peer.removeTrack(sender);
    } catch (_) {
      try { await sender.replaceTrack(null); } catch (_) {}
    }
    els.localVideo.srcObject = null;
    await renegotiateCall('screen-stop', { sharing_screen: false });
  }

  state.call.status = 'connected';
  renderCallShell();
}

async function toggleScreenShare() {
  if (!state.call.peer) return;
  if (!navigator.mediaDevices?.getDisplayMedia) {
    showToast('Демонстрация экрана доступна только через localhost или HTTPS', 'error');
    return;
  }
  if (state.call.sharingScreen) {
    await stopScreenShare();
    return;
  }
  try {
    const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
    const screenTrack = displayStream.getVideoTracks()[0];
    if (!screenTrack) throw new Error('Не удалось получить экран');

    let sender = getVideoSender();
    let needsRenegotiation = false;

    if (sender) {
      await sender.replaceTrack(screenTrack);
    } else {
      sender = state.call.peer.addTrack(screenTrack, displayStream);
      needsRenegotiation = true;
    }

    state.call.screenSender = sender;
    state.call.screenStream = displayStream;
    state.call.sharingScreen = true;
    state.call.status = 'screen-sharing';
    els.localVideo.srcObject = new MediaStream([screenTrack]);

    screenTrack.onended = () => {
      stopScreenShare().catch(() => {});
    };

    if (needsRenegotiation) {
      const ok = await renegotiateCall('screen-start', { sharing_screen: true });
      if (!ok) showToast('Не удалось согласовать демонстрацию экрана', 'error');
    } else {
      notifyScreenState(true);
    }
    renderCallShell();
  } catch (error) {
    showToast(error.message || 'Не удалось начать демонстрацию', 'error');
  }
}

async function resetCallState(notifyPeer) {
  const targetUser = state.call.targetUser;
  const conversationId = state.call.targetConversationId || 0;
  const callId = state.call.callId;
  const video = state.call.video;
  if (notifyPeer && targetUser) {
    sendCallSignal('call:end', targetUser.id, conversationId, { reason: 'ended' }, { callId, video });
  }

  clearTimeout(state.call.reconnectTimer);
  if (state.call.peer) {
    try { state.call.peer.close(); } catch (_) {}
  }
  if (state.call.localStream) {
    state.call.localStream.getTracks().forEach((track) => track.stop());
  }
  if (state.call.remoteStream) {
    state.call.remoteStream.getTracks().forEach((track) => track.stop());
  }
  if (state.call.screenStream) {
    state.call.screenStream.getTracks().forEach((track) => track.stop());
  }
  if (callId) delete state.earlyCallIce[callId];
  state.call = baseCallState();
  state.pendingIncomingCall = null;
  els.remoteVideo.srcObject = null;
  els.localVideo.srcObject = null;
  restoreBrowserAfterCall();
  renderUtilityPane();
}

async function sendMessage() {
  let conversation = getActiveConversation();
  if (!conversation && state.activeConversationId) {
    await refreshConversations(true);
    conversation = getActiveConversation();
  }
  if (!conversation) {
    showToast('Сначала откройте чат', 'error');
    return;
  }
  if (conversation.kind === 'yupikey' && !conversation.is_owner) {
    showToast('Писать в UPK может только создатель. Откройте комментарии к посту.', 'error');
    return;
  }
  const body = els.messageInput.value.trim();
  if (!body) return;
  els.messageInput.disabled = true;
  try {
    const message = await api(`/api/conversations/${conversation.id}/messages`, {
      method: 'POST',
      body: JSON.stringify({ body }),
    });
    upsertMessage(message);
    els.messageInput.value = '';
    renderMessages();
    await refreshConversations(true);
    renderConversationLists();
    renderChatHeader();
  } finally {
    els.messageInput.disabled = false;
    focusComposer();
  }
}

async function toggleFavorite() {
  const conversation = getActiveConversation();
  if (!conversation) return;
  await patchConversationPrefs(conversation.id, { is_favorite: !isFavorite(conversation) });
}

async function toggleMute() {
  const conversation = getActiveConversation();
  if (!conversation) return;
  await patchConversationPrefs(conversation.id, { is_muted: !isMuted(conversation) });
}

async function toggleArchive() {
  const conversation = getActiveConversation();
  if (!conversation) return;
  const next = !isArchived(conversation);
  await patchConversationPrefs(conversation.id, {
    is_archived: next,
    is_muted: next ? true : conversation.prefs.is_muted,
  });
  if (next) state.panelMode = 'archive';
}

async function logout() {
  try {
    await api('/api/auth/logout', { method: 'POST' });
  } catch (_) {}
  localStorage.removeItem('yupi_token');
  state.token = '';
  state.me = null;
  state.conversations = [];
  state.messages = [];
  state.upkPosts = [];
  state.activeConversationId = null;
  if (state.ws) {
    try { state.ws.close(); } catch (_) {}
  }
  state.ws = null;
  switchScreen(els.auth);
  setAuthView('login');
}

function handleBrowserButton(name) {
  if (!browserSources[name]) return;
  state.utilityFocus = 'music';
  state.browser.active = name;
  localStorage.setItem('yupi_music_source', name);
  state.browser.url = browserSources[name].url;
  state.browser.title = browserSources[name].title;
  renderUtilityPane();
}

async function callLocalBridge(method, payload) {
  if (window.pywebview && window.pywebview.api && typeof window.pywebview.api[method] === 'function') {
    return await window.pywebview.api[method](payload);
  }

  const params = new URLSearchParams(window.location.search);
  const isLocalMode = params.get('desktop') === '1' || document.body?.dataset?.desktop === '1';
  if (!isLocalMode) return null;

  if (method === 'open_music_source') {
    return await api(`/api/desktop/open-music/${encodeURIComponent(payload)}`, { method: 'POST' });
  }

  if (method === 'open_external') {
    return await api('/api/desktop/open-external', {
      method: 'POST',
      body: JSON.stringify({ url: payload }),
    });
  }

  return null;
}

function selectedMusicSource() {
  if (!state.browser.active || !browserSources[state.browser.active]) {
    ensureMusicSelected();
  }
  return browserSources[state.browser.active] || browserSources.vk;
}

function openMusicPopupWindow(source = selectedMusicSource()) {
  if (!source) return null;
  const url = source.popupUrl || source.url;
  const name = source.popupName || 'YupiMusicWindow';
  const features = [
    'popup=yes',
    'width=460',
    'height=760',
    'left=120',
    'top=80',
    'resizable=yes',
    'scrollbars=yes',
    'noopener=no',
    'noreferrer=no'
  ].join(',');
  const popup = window.open(url, name, features);
  if (!popup) {
    showToast('Браузер заблокировал мини-окно. Разрешите всплывающие окна для Yupi.', 'error');
    return null;
  }
  try { popup.focus(); } catch (_) {}
  showToast(`${source.title} открыта в мини-окне`);
  return popup;
}

function showMusicMiniWindow(source = selectedMusicSource(), forceReload = false) {
  if (!source || !els.musicMiniWindow || !els.musicMiniFrame) return;
  const frameUrl = source.embedUrl || source.url;
  els.musicMiniWindow.classList.remove('hidden');
  if (els.musicMiniTitle) els.musicMiniTitle.textContent = source.title;
  if (els.musicMiniUrl) els.musicMiniUrl.textContent = (source.popupUrl || source.url).replace(/^https?:\/\//, '');
  window.clearTimeout(state.musicMiniFallbackTimer);

  if (source.localPreview) {
    els.musicMiniFrame.src = 'about:blank';
    els.musicMiniFrame.dataset.loadedUrl = 'about:blank';
    els.musicMiniFrame.classList.add('music-frame-disabled');
    if (els.musicMiniFallback) els.musicMiniFallback.classList.remove('hidden');
    return;
  }

  els.musicMiniFrame.classList.remove('music-frame-disabled');
  if (els.musicMiniFallback) els.musicMiniFallback.classList.add('hidden');
  if (forceReload || els.musicMiniFrame.dataset.loadedUrl !== frameUrl) {
    els.musicMiniFrame.src = frameUrl;
    els.musicMiniFrame.dataset.loadedUrl = frameUrl;
  }
  state.musicMiniFallbackTimer = window.setTimeout(() => {
    if (els.musicMiniWindow && !els.musicMiniWindow.classList.contains('hidden') && els.musicMiniFallback) {
      els.musicMiniFallback.classList.remove('hidden');
    }
  }, 2800);
}

function closeMusicMiniWindow() {
  if (!els.musicMiniWindow) return;
  els.musicMiniWindow.classList.add('hidden');
  window.clearTimeout(state.musicMiniFallbackTimer);
}

async function openMusicSource(preferApp = true) {
  const sourceKey = state.browser.active || localStorage.getItem('yupi_music_source') || 'vk';
  const source = browserSources[sourceKey] || browserSources.vk;
  if (!source) return;

  const params = new URLSearchParams(window.location.search);
  const canUseDesktopBridge = Boolean(window.pywebview?.api?.open_music_source)
    || params.get('desktop') === '1'
    || document.body?.dataset?.desktop === '1';

  // В обычном браузере открываем сразу, синхронно с кликом. Иначе браузер считает это попапом из async и блокирует.
  if (!preferApp || !canUseDesktopBridge) {
    openMusicPopupWindow(source);
    return;
  }

  try {
    const result = await callLocalBridge('open_music_source', sourceKey);
    if (result && result.ok) {
      showToast(`${source.title} открыта во внешнем браузере`);
      return;
    }
  } catch (error) {
    console.warn('Music bridge failed:', error);
  }

  openMusicPopupWindow(source);
}

async function probeMusicSource() {
  const sourceKey = state.browser.active;
  if (!sourceKey) return;
  els.musicStatusText.textContent = 'Проверяю доступность сети...';
  els.musicStatusCard.classList.remove('is-error', 'is-ok');
  try {
    const result = await api(`/api/music/probe/${encodeURIComponent(sourceKey)}`);
    state.browser.probes[sourceKey] = result;
    renderBrowserShell();
  } catch (error) {
    state.browser.probes[sourceKey] = { ok: false, status: 0, message: error.message || 'Ошибка проверки сети' };
    renderBrowserShell();
  }
}

function closeTopLayerOrBack() {
  if (!els.newChatModal.classList.contains('hidden')) {
    closeModal(els.newChatModal);
    return true;
  }
  if (state.upkSearch.open) {
    closeUpkSearch();
    return true;
  }
  if (state.channelInfoConversationId) {
    closeChannelInfo();
    return true;
  }
  if (state.pendingIncomingCall || state.call.active) {
    state.utilityFocus = state.utilityFocus === 'music' ? 'call' : 'music';
    if (state.utilityFocus === 'music') ensureMusicSelected();
    renderUtilityPane();
    return true;
  }
  if (state.panelMode === 'settings') {
    state.panelMode = 'chat';
    renderAll();
    return true;
  }
  if (state.panelMode === 'upk' && state.activeConversationId) {
    state.activeConversationId = null;
    state.upkPosts = [];
    closeUpkSearch();
    renderAll();
    return true;
  }
  if (state.activeConversationId) {
    state.activeConversationId = null;
    state.messages = [];
    renderAll();
    return true;
  }
  return false;
}

function toggleMusicPlayMock() {
  ensureMusicSelected();
  state.musicPlaying = !state.musicPlaying;
  if (els.musicPlayBtn) els.musicPlayBtn.textContent = state.musicPlaying ? '▌▌' : '▶';
  if (els.musicProgressFill) els.musicProgressFill.style.width = state.musicPlaying ? '36%' : '18%';
  renderBrowserShell();
}

function bindEvents() {
  els.authTabs.forEach((btn) => btn.addEventListener('click', () => setAuthView(btn.dataset.authView)));

  els.loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await doLogin(new FormData(els.loginForm));
    } catch (error) {
      showToast(error.message, 'error');
    }
  });

  els.registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await doRegister(new FormData(els.registerForm));
    } catch (error) {
      showToast(error.message, 'error');
    }
  });

  els.homeBtn.addEventListener('click', () => {
    state.panelMode = 'chat';
    state.activeConversationId = null;
    state.messages = [];
    state.channelInfoConversationId = null;
    renderAll();
  });
  els.newChatBtn.addEventListener('click', async () => {
    state.panelMode = 'chat';
    state.activeConversationId = null;
    state.messages = [];
    state.channelInfoConversationId = null;
    renderAll();
    setCreateView('direct');
    state.selectedGroupUsers = [];
    state.selectedYupiKeyUsers = [];
    renderSelectedAreas();
    els.userSearchInput.value = '';
    els.groupSearchInput.value = '';
    els.yupiKeySearchInput.value = '';
    els.groupTitleInput.value = '';
    els.yupiKeyTitleInput.value = '';
    openModal(els.newChatModal);
    try {
      await runDirectSearch('');
      await runGroupSearch('', 'group');
      await runGroupSearch('', 'yupikey');
    } catch (error) {
      showToast(error.message, 'error');
    }
  });
  els.archiveNavBtn.addEventListener('click', () => {
    state.panelMode = 'archive';
    state.activeConversationId = null;
    state.messages = [];
    state.channelInfoConversationId = null;
    renderAll();
  });
  els.upkNavBtn.addEventListener('click', async () => {
    state.panelMode = 'upk';
    state.activeConversationId = null;
    state.messages = [];
    state.upkPosts = [];
    state.channelInfoConversationId = null;
    closeUpkSearch();
    renderAll();
  });
  els.settingsGearBtn.addEventListener('click', () => {
    state.panelMode = 'settings';
    renderAll();
  });
  els.settingsNavBtn.addEventListener('click', () => {
    state.panelMode = 'settings';
    renderAll();
  });
  els.adminConsoleNavBtn?.addEventListener('click', async () => {
    if (!isSupportUser()) return;
    state.panelMode = 'console';
    renderAll();
    await refreshAdminConsole({ quiet: true });
  });
  els.sidebarRefreshBtn.addEventListener('click', async () => {
    try {
      await refreshConversations();
      renderAll();
      showToast('Обновлено');
    } catch (error) {
      showToast(error.message, 'error');
    }
  });
  els.logoutBtn.addEventListener('click', logout);

  els.dashboardTabs.forEach((btn) => btn.addEventListener('click', () => {
    state.filter = btn.dataset.filter;
    els.dashboardTabs.forEach((item) => item.classList.toggle('active', item === btn));
    renderConversationLists();
  }));
  els.conversationSearch.addEventListener('input', () => renderConversationLists());

  els.composerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await sendMessage();
    } catch (error) {
      showToast(error.message, 'error');
    }
  });
  els.messageInput.addEventListener('input', () => {
    const conversation = getActiveConversation();
    if (!conversation) return;
    sendWs({ type: 'typing', conversation_id: conversation.id });
  });
  els.emojiBtn.addEventListener('click', () => {
    els.messageInput.value += ' 😊';
    els.messageInput.focus();
  });

  els.favoriteToggleBtn.addEventListener('click', () => toggleFavorite().catch((error) => showToast(error.message, 'error')));
  els.muteToggleBtn.addEventListener('click', () => toggleMute().catch((error) => showToast(error.message, 'error')));
  els.archiveToggleBtn.addEventListener('click', () => toggleArchive().catch((error) => showToast(error.message, 'error')));
  els.audioCallBtn.addEventListener('click', () => startOutgoingCall(false));
  els.videoCallBtn.addEventListener('click', () => startOutgoingCall(true));
  [els.chatAvatar, els.chatTitle].forEach((node) => {
    node?.addEventListener('click', () => {
      const conversation = getActiveConversation();
      if (conversation && conversation.kind !== 'direct') openChannelInfo(conversation.id);
    });
  });
  els.infoAudioCall.addEventListener('click', () => startOutgoingCall(false));
  els.infoVideoCall.addEventListener('click', () => startOutgoingCall(true));

  els.settingsForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const firstName = (els.settingsName?.value || '').trim();
      const lastName = (els.settingsLastName?.value || '').trim();
      const displayName = [firstName, lastName].filter(Boolean).join(' ') || state.me.display_name;
      state.me = await api('/api/me', {
        method: 'PUT',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          display_name: displayName,
          bio: (els.settingsBio?.value || '').trim(),
          youtube_url: (els.settingsYoutube?.value || '').trim(),
        }),
      });
      renderAll();
      showToast('Профиль сохранен');
    } catch (error) {
      showToast(error.message, 'error');
    }
  });

  els.browserButtons.forEach((button) => {
    button.addEventListener('click', () => handleBrowserButton(button.dataset.browser));
  });
  els.openBrowserExternal.addEventListener('click', () => openMusicSource(false));
  els.musicOpenApp?.addEventListener('click', () => openMusicSource(true));
  els.musicPreviewOpenBtn?.addEventListener('click', () => openMusicSource(true));
  els.musicProbeBtn?.addEventListener('click', () => probeMusicSource());
  els.utilitySwapBtn?.addEventListener('click', () => {
    state.utilityFocus = state.utilityFocus === 'music' ? 'call' : 'music';
    if (state.utilityFocus === 'music') ensureMusicSelected();
    renderUtilityPane();
  });
  els.callPanelBackBtn?.addEventListener('click', () => closeTopLayerOrBack());
  els.musicPlayBtn?.addEventListener('click', () => toggleMusicPlayMock());
  els.musicPrevBtn?.addEventListener('click', () => showToast('Предыдущий трек — визуальная кнопка'));
  els.musicNextBtn?.addEventListener('click', () => showToast('Следующий трек — визуальная кнопка'));
  els.musicShuffleBtn?.addEventListener('click', () => showToast('Перемешивание — визуальная кнопка'));
  els.musicWindowBtn?.addEventListener('click', () => showMusicMiniWindow(selectedMusicSource(), true));
  els.musicMiniCloseBtn?.addEventListener('click', () => closeMusicMiniWindow());
  els.musicMiniExternalBtn?.addEventListener('click', () => openMusicSource(false));
  els.musicMiniFrame?.addEventListener('load', () => {
    window.clearTimeout(state.musicMiniFallbackTimer);
    window.setTimeout(() => {
      if (els.musicMiniFallback && els.musicMiniWindow && !els.musicMiniWindow.classList.contains('hidden')) {
        els.musicMiniFallback.classList.remove('hidden');
      }
    }, 1800);
  });

  els.acceptCallBtn.addEventListener('click', () => acceptIncomingCall().catch((error) => showToast(error.message, 'error')));
  els.rejectCallBtn.addEventListener('click', () => rejectIncomingCall().catch((error) => showToast(error.message, 'error')));
  els.incomingCallToastAccept?.addEventListener('click', () => acceptIncomingCall().catch((error) => showToast(error.message, 'error')));
  els.incomingCallToastReject?.addEventListener('click', () => rejectIncomingCall().catch((error) => showToast(error.message, 'error')));
  els.callMicBtn.addEventListener('click', () => toggleMic().catch((error) => showToast(error.message, 'error')));
  els.callSoundBtn.addEventListener('click', () => toggleSound().catch((error) => showToast(error.message, 'error')));
  els.callCameraBtn.addEventListener('click', () => toggleCamera().catch((error) => showToast(error.message, 'error')));
  els.callScreenBtn.addEventListener('click', () => toggleScreenShare().catch((error) => showToast(error.message, 'error')));
  els.callEndBtn.addEventListener('click', () => resetCallState(true).catch((error) => showToast(error.message, 'error')));

  els.createViewTabs.forEach((button) => button.addEventListener('click', () => setCreateView(button.dataset.createView)));
  els.userSearchInput.addEventListener('input', () => runDirectSearch(els.userSearchInput.value).catch((error) => showToast(error.message, 'error')));
  els.groupSearchInput.addEventListener('input', () => runGroupSearch(els.groupSearchInput.value, 'group').catch((error) => showToast(error.message, 'error')));
  els.yupiKeySearchInput.addEventListener('input', () => runGroupSearch(els.yupiKeySearchInput.value, 'yupikey').catch((error) => showToast(error.message, 'error')));

  els.createGroupBtn.addEventListener('click', () => createGroup('group').catch((error) => showToast(error.message, 'error')));
  els.createYupiKeyBtn.addEventListener('click', () => createGroup('yupikey').catch((error) => showToast(error.message, 'error')));

  els.upkCreateChannelBtn?.addEventListener('click', () => {
    const channel = getActiveYupiKey();
    if (channel) openUpkSearch();
    else openCreateYupiKeyModal();
  });
  els.upkEmptyCreateBtn?.addEventListener('click', () => openCreateYupiKeyModal());
  els.upkBackBtn?.addEventListener('click', () => {
    state.panelMode = 'upk';
    state.activeConversationId = null;
    state.upkPosts = [];
    closeUpkSearch();
    state.channelInfoConversationId = null;
    renderAll();
  });
  els.profileUpkBtn?.addEventListener('click', async () => {
    const owned = getOwnedYupiKeys();
    if (!owned.length) {
      openCreateYupiKeyModal();
      return;
    }
    state.profileUpkPickerOpen = !state.profileUpkPickerOpen;
    renderProfile();
  });
  els.upkPostForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await createUpkPost();
    } catch (error) {
      showToast(error.message, 'error');
    }
  });

  [els.upkAvatar, els.upkChannelTitle].forEach((node) => {
    node?.addEventListener('click', () => {
      const channel = getActiveYupiKey();
      if (channel) openChannelInfo(channel.id);
    });
  });

  els.upkSearchInput?.addEventListener('input', () => {
    state.upkSearch.query = els.upkSearchInput.value;
    state.upkSearch.index = 0;
    state.upkSearch.listOpen = false;
    renderUpkView();
  });
  els.upkSearchPrevBtn?.addEventListener('click', () => stepUpkSearch(-1));
  els.upkSearchNextBtn?.addEventListener('click', () => stepUpkSearch(1));
  els.upkSearchListBtn?.addEventListener('click', () => {
    state.upkSearch.listOpen = !state.upkSearch.listOpen;
    renderUpkView();
  });
  els.upkSearchCloseBtn?.addEventListener('click', () => closeUpkSearch());

  els.channelInfoCloseBtn?.addEventListener('click', () => closeChannelInfo());
  els.channelInfoSaveBtn?.addEventListener('click', async () => {
    const conversation = state.conversations.find((item) => item.id === Number(state.channelInfoConversationId));
    if (!conversation) return;
    try {
      await updateChannelInfo(conversation.id, { title: (els.channelInfoNameInput?.value || '').trim() });
      await openChannelInfo(conversation.id);
    } catch (error) {
      showToast(error.message || 'Не удалось сохранить канал', 'error');
    }
  });
  els.channelInfoAvatarUploadBtn?.addEventListener('click', () => els.channelInfoAvatarUploadInput?.click());
  els.channelInfoAvatarUploadInput?.addEventListener('change', async () => {
    const file = els.channelInfoAvatarUploadInput.files?.[0];
    const conversation = state.conversations.find((item) => item.id === Number(state.channelInfoConversationId));
    if (!file || !conversation) return;
    try {
      await uploadChannelAvatar(conversation.id, file);
      await openChannelInfo(conversation.id);
    } catch (error) {
      showToast(error.message || 'Не удалось загрузить аватар канала', 'error');
    } finally {
      els.channelInfoAvatarUploadInput.value = '';
    }
  });


  els.profileAvatarUploadBtn?.addEventListener('click', () => els.profileAvatarUploadInput?.click());
  els.profileAvatarUploadInput?.addEventListener('change', async () => {
    const file = els.profileAvatarUploadInput.files?.[0];
    if (!file) return;
    try {
      await uploadProfileAvatar(file);
    } catch (error) {
      showToast(error.message || 'Не удалось загрузить аватар', 'error');
    } finally {
      els.profileAvatarUploadInput.value = '';
    }
  });

  els.adminConsoleRefreshBtn?.addEventListener('click', () => refreshAdminConsole({ quiet: false }));
  els.mediaRefreshBtn?.addEventListener('click', () => loadLocalMedia({ quiet: false }));
  els.backgroundUploadBtn?.addEventListener('click', () => els.backgroundUploadInput?.click());
  els.backgroundUploadInput?.addEventListener('change', async () => {
    const file = els.backgroundUploadInput.files?.[0];
    if (!file) return;
    try {
      await uploadLocalMedia({ kind: 'background', file });
    } catch (error) {
      showToast(error.message || 'Не удалось загрузить фон', 'error');
    } finally {
      els.backgroundUploadInput.value = '';
    }
  });

  els.mediaSlotList?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-icon-upload-btn]');
    if (!button) return;
    const input = els.mediaSlotList.querySelector(`[data-icon-upload="${button.dataset.iconUploadBtn}"]`);
    input?.click();
  });

  els.mediaSlotList?.addEventListener('change', async (event) => {
    const input = event.target.closest('[data-icon-upload]');
    if (!input) return;
    const slot = Number(input.dataset.iconUpload);
    const file = input.files?.[0];
    if (!file) return;
    try {
      await uploadLocalMedia({ kind: 'icon', slot, file });
    } catch (error) {
      showToast(error.message || 'Не удалось загрузить иконку', 'error');
    } finally {
      input.value = '';
    }
  });

  els.backgroundGrid?.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-background-name]');
    if (!button) return;
    try {
      await selectLocalBackground(button.dataset.backgroundName);
    } catch (error) {
      showToast(error.message || 'Не удалось применить фон', 'error');
    }
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => closeModal(document.getElementById(button.dataset.closeModal)));
  });

  els.contextButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const action = button.dataset.contextAction;
      const conversationId = state.contextConversationId;
      hideContextMenu();
      if (!conversationId) return;
      const conversation = state.conversations.find((item) => item.id === conversationId);
      if (!conversation) return;
      try {
        if (action === 'mute') {
          await patchConversationPrefs(conversationId, { is_muted: !isMuted(conversation) });
        } else if (action === 'archive') {
          await patchConversationPrefs(conversationId, { is_archived: true, is_muted: true });
        } else if (action === 'attach') {
          showToast('Скрепка пока без действия');
        } else if (action === 'delete') {
          await deleteConversation(conversationId);
        }
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeTopLayerOrBack();
  });

  document.addEventListener('click', (event) => {
    if (!els.contextMenu.contains(event.target)) hideContextMenu();
  });
  window.addEventListener('resize', hideContextMenu);

  els.upkActionButtons.forEach((button) => button.addEventListener('click', () => {
    const label = button.dataset.upkAction === 'launch'
      ? 'Канал запуска'
      : button.dataset.upkAction === 'voice'
      ? 'Раздел звонков'
      : 'Раздел приватности';
    showToast(`${label} открыт`);
  }));
}

async function init() {
  bindEvents();
  loadLocalMedia({ quiet: true });
  setAuthView('login');
  setCreateView('direct');
  renderSelectedAreas();
  try {
    const info = await fetch('/api/server-info', { cache: 'no-store' }).then((r) => r.ok ? r.json() : null).catch(() => null);
    applyServerInfo(info);
  } catch (error) {
    applyServerInfo(null);
  }
  setTimeout(async () => {
    if (state.token) {
      await bootstrapApp();
    } else {
      switchScreen(els.auth);
    }
  }, 1100);
}

init();