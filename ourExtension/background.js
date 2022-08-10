var global_safelist = null
var current_context_id = "";
let extensions_removeElems = new Set(['aghknfeghpcdcnalgcjadfcelpgnagjg', 'iemfcmhgcobinbmfpiiimieniodcjomj', 'infmfepmdljfpodehfnmjpimdijamodp', 'dchkbanpgboppemgcafbdbefnanhimli', 'pjampmeioppocdkamobkbneciakpeplm', 'gjiiemkpmochlmjeabhkgklobeainoeg', 'aaacilckajbambkbjbeghcjjobcibnkb', 'jjlgcaiolppkpmpgicnpabgnhncgjaip', 'ehnccnmpoijjklegjfkgbfakcjiaaekj', 'clleglenbchkccjkdidjgednoamialjd', 'pdjgmlpblmjkigiieklodaamoacgneff', 'acaddkimmjhinkbhplbodaigapgcplbb', 'lihjhpmnjdfekpdkgichpjmofgebmbkl', 'gggdljcgmiakikibajlilogpdcjlhkdj', 'cgbjgnebmafpalandcmmalkncndcfnpo', 'kohedmkeahkfbjcbcogjpoliboldaeda', 'eiacggpokhgnonjjnliaohnnmbichcmb', 'fmmlppmgfnnblnogccleipeicmopijhb', 'ihcpccaakobgbhdecdohjlcaffkkielf', 'bhafmmkaabjpkioljjlefoafmgaefdhh', 'oiiohfpnbijbgdidjfcpcljcfbmkaooi', 'obdkjnmippadccjpbmdnbmloaagnockf', 'cnlfiniglojkghaimelkdfinhodgdaom', 'gfbkbeglbceeonopbimpdejbdofmflke', 'coikbolpkfecmhgfbhgclaggbakhekfe', 'phbfehpiaglnfieempogcbnkpcoilkkb', 'pikpmflklcjjcpmjflnkpfaapnkidffj', 'lopfhcjmkkfpbbfhkohkpipplhenebdf', 'eadjicgcnpgfmklebobjkhlippgepdii', 'ffjbphfbjjajomilfhdddhkgiephplbg', 'pnogggfcedmakohjmpnojcaaieoeikkb', 'cmfcdkambpljcndgdmaccaagladfnepa', 'ihlipanjokpgacmoklokfkgkcdaalfgb', 'eimgagcpdnfdoloblpkcpfmekldhmgkj', 'eimjnkpijljdldfcnmibkclnhchiabll', 'hgmohigokclifmjbefmeajmpmhpdaeom', 'npggldhiiomhaohbfdajoodplpmapbjh', 'aokccbphofbndojbkkeegfhmdomjhjmd', 'hfpgpmnapkjlmdogaeiimdoplddnokeb', 'pgfmbnoeccaheacamopmfejpbfclidhi', 'kddcpdmebaiafhaehadlnfaoldaocmpk', 'ighgfpcohidklmkdapdkhpjnonlheeac', 'cpnlhnccdkmfcmofnmicgdofdlnpifjk', 'gdpakaocmnomelablabefgoadakdepea', 'bmbmkaepgekfmflkhclfgijjdeemloeo', 'eeeiohnghlkmobmbnlddligielhhjicj', 'jpndmheamdfgdnocliclcejfcdfjkhla', 'pppgogpffnbgfkmmfapnahkgbcemkklg', 'aahjdlliedigkegdafbjecifjnbhhoda', 'nggpkbejpjoikollcocnfahnghbcihlk', 'agngamdplpklbhjbldokcalcbfgogahi', 'ijkbgbanohackmhaofchgjbggdphhacb', 'bhbmkgnfkhpcbpeaclaknfiiklknplnf', 'ejddcgojdblidajhngkogefpkknnebdh', 'gjbepkalbfffninamijgbcniiiogcgjp', 'mnicfonfoiffhekefgjlaihcpnbchdbc', 'necjalgglofmnigfikoaojnmkminpmbn', 'lahmemhgdeidndkhppfadiphllbmlglk', 'hojgjeiaognigdpphinpoobgpmgpkone']);

// making Simulacrum's content script execute before all others
chrome.management.getAll(function(items) {
	let extensions_removeElems_found = false;
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (chrome.runtime.id != item.id){
			if (item.enabled){
				chrome.management.setEnabled(item.id, false)
				chrome.management.setEnabled(item.id, true)
				// Check if is there an extension that might remove an element
				if (extensions_removeElems.has(item.id))
					extensions_removeElems_found = true;
			}
		}
	}
	chrome.storage.sync.set({"rmElems": extensions_removeElems_found});
});

chrome.storage.sync.get("safelist", function(retrieved_data) {
	//  items = { "yourBody": "myBody" }
	let safelist = retrieved_data["safelist"]
	if (safelist && Object.keys(safelist).length === 0 && safelist.constructor === Object || !safelist) {
		chrome.storage.sync.set({"safelist":{}});
		global_safelist = {}
	} else {
		global_safelist = safelist;
	}
});

if (global_safelist === null){
	chrome.storage.sync.get("safelist", function(retrieved_data) {
		//  items = { "yourBody": "myBody" }
		let safelist = retrieved_data["safelist"]
		if (safelist && Object.keys(safelist).length === 0 && safelist.constructor === Object || !safelist) {
			global_safelist = {}
		} else {
			global_safelist = safelist;
		}
	});
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	if (info.menuItemId === "add_to_safelist" || info.menuItemId === "remove_from_safelist")  {
		chrome.tabs.query({active: true, currentWindow: true}, tabs => {
			var url = new URL(tabs[0].url);
			chrome.storage.sync.get("safelist", function(retrieved_data){
				//  items = { "yourBody": "myBody" }
				let safelist = retrieved_data["safelist"]
				if (safelist && Object.keys(safelist).length === 0 && safelist.constructor === Object || !safelist){
					safelist = {}
				}
				if (url.href.startsWith("http")){
					let hostname = url.hostname;
					if (info.menuItemId === "remove_from_safelist"){
						delete safelist[hostname]
					} else {
						safelist[hostname] = "1";
					}
					chrome.storage.sync.set({"safelist":safelist}, function(){
						console.log(`Saved`, safelist, `successfully`);
						global_safelist = safelist
						updateFeedback(url);
						chrome.tabs.reload(tabs[0].id);
					});
				}
			});
		});
	}
});

// fire when navigating to a new url
chrome.webNavigation.onCommitted.addListener((details) =>{
	updateActivatedTab()
});

// fire when changing from one tab to another
chrome.tabs.onActivated.addListener(function(activeInfo) {
	updateActivatedTab();
});

function updateActivatedTab(){
	ChromeWrapper.chromeTabsQuery({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		let url = new URL("http://im_just_a_url.com");
		if(tabs[0] !== undefined){
			if (tabs[0].url.startsWith("http")){
				url = new URL(tabs[0].url);
			}
		}
		updateFeedback(url)
	});
}


function updateFeedback(url){
	if (global_safelist === null){
		console.warn("global_safelist is null, this shouldn't happen b/c it is defaulted now")
		chrome.browserAction.setIcon({path: "/simulacrum_48.png"});
		return;
	}
	if (current_context_id){
		chrome.contextMenus.remove(current_context_id);
	}
	if (url.hostname in global_safelist){
		chrome.browserAction.setIcon({path: "/simulacrum_48_red.png"});
		let menu_entry = {
			id:"remove_from_safelist",
			title: "Remove Site from Safelist",
			contexts: ["browser_action"]
		};
		current_context_id = chrome.contextMenus.create(menu_entry, () => {
			const err = chrome.runtime.lastError;
			if (err) {
				console.warn('Context menu error ignored:', err);
			}
		});
	} else {
		chrome.browserAction.setIcon({path: "/simulacrum_48.png"});
		menu_entry = {
			id:"add_to_safelist",
			title: "Add Site to Safelist",
			contexts: ["browser_action"]
		};
		current_context_id = chrome.contextMenus.create(menu_entry, () => {
			const err = chrome.runtime.lastError;
			if (err) {
				console.log('Context menu error ignored:', err);
			}
		});
	}
}

// Created this b/c of bug in Chrom91
// https://stackoverflow.com/a/68255568/6581060
const ChromeWrapper = {
	chromeTabsQuery: function (params, callback) {
		chrome.tabs.query(params, tabs => {
			if (chrome.runtime.lastError) {
				setTimeout(function () {
					//console.warn("Patch for xchrome.tabs.query (Chrome 91).");
					ChromeWrapper.chromeTabsQuery(params, callback)
				}, 100); // arbitrary delay
			} else {
				callback(tabs)
			}
		})
	}
}
