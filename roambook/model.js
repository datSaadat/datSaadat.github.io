export const TYPES=['country','state','city','national-park','state-park'];
export function placeKey(v){return [v.type,v.country,v.type.endsWith('park')?'':v.state,v.name.trim().toLocaleLowerCase()].join('|');}
export function summarize(records){
 const visits=records.filter(v=>v.status==='visited');
 const countries=new Set(visits.map(v=>v.country));
 const states=new Set(visits.filter(v=>v.country==='US'&&v.state&&!['District of Columbia','Puerto Rico'].includes(v.state)).map(v=>v.state));
 const count=(f)=>new Set(visits.filter(f).map(placeKey)).size;
 return {countries,states,counts:[countries.size,states.size,count(v=>v.type==='city'&&v.country==='US'),count(v=>v.type==='city'&&v.country!=='US'),count(v=>v.type==='national-park'),count(v=>v.type==='state-park')]};
}
export function validateVisit(v){
 if(!v||!TYPES.includes(v.type)||!['visited','wishlist','transit'].includes(v.status))throw Error('Invalid place type or status.');
 for(const [k,max] of [['name',120],['country',8],['state',80],['date',10],['trip',100],['notes',2000]])if(typeof v[k]!=='string'||v[k].length>max)throw Error('Invalid '+k+'.');
 if(!v.name.trim()||!v.country)throw Error('Choose a place and country.');
 if((v.type==='state'||v.type.endsWith('park'))&&v.country!=='US')throw Error('States and parks in this version must be in the US.');
 if(v.country==='US'&&v.type!=='country'&&!v.state)throw Error('Choose the US state you visited.');
 if(v.date&&(!/^\d{4}-\d{2}-\d{2}$/.test(v.date)||!Number.isFinite(Date.parse(v.date))||new Date(v.date).toISOString().slice(0,10)!==v.date))throw Error('Use a valid visit date.');
 if(v.status==='visited'&&v.date){const today=new Date();const local=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;if(v.date>local)throw Error('Future visits belong on your wishlist.');}
 return v;
}
export const demo=[
 {id:'demo-1',type:'national-park',name:'Yosemite National Park',country:'US',state:'California',date:'2025-06-14',status:'visited',trip:'Out west',notes:'Granite giants, pine-scented mornings, and a sky full of stars.'},
 {id:'demo-2',type:'city',name:'Lisbon',country:'PT',state:'',date:'2025-04-08',status:'visited',trip:'A little European escape',notes:'A yellow tram, a steep street, and one more pastel de nata.'},
 {id:'demo-3',type:'city',name:'Kyoto',country:'JP',state:'',date:'2024-10-20',status:'visited',trip:'Autumn in Japan',notes:'Quiet temple gardens and the first gold leaves of autumn.'},
 {id:'demo-4',type:'city',name:'Austin',country:'US',state:'Texas',date:'2024-03-10',status:'visited',trip:'Texas weekends',notes:'An afternoon by the water.'},
 {id:'demo-5',type:'city',name:'Paris',country:'FR',state:'',date:'2023-05-12',status:'visited',trip:'A little European escape',notes:''},
 {id:'demo-6',type:'country',name:'Iceland',country:'IS',state:'',date:'',status:'wishlist',trip:'',notes:'Waterfalls and a slow road trip.'},
 {id:'demo-7',type:'state-park',name:'Palo Duro Canyon State Park',country:'US',state:'Texas',date:'2023-10-15',status:'visited',trip:'Texas weekends',notes:''}
];
