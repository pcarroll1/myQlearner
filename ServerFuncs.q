///////////////////////////
//
// Library for Q Server
//
///////////////////////////

// libs

// args
funcRef:([func:()];logic:();params:();out:());
`funcRef upsert (`add;"{x+y}";(3;4);7);
`funcRef upsert (`del;"{x-y}";(7;2);5);
`funcRef upsert (`mult;"{x*y}";(9;9);81);

// Function Integrated into Tbl
//(value (funcRef[`add][`logic])) . funcRef[`add][`params]


// functions
/Input Separating Function
funcSep:{[x];funcs:()!();funcs[(`$(x?":")#x)]:(((x?":")+1)_x);funcs};
/Feed Handling Function
//.z.ws:{neg[.z.w].Q.s select input,expected,actual from (select input,first expected by actual from ([]input:(3;4);expected:7;actual:(value(a[first key a:funcSep(raze string[x])])) . (3;4)))}
.z.ws:{neg[.z.w].Q.s
	$[(first key funcSep(raze string[x])) in key funcRef;
		`input`Actual`Expected xcols () xkey (select input,Expected:(first Expected) by Actual from ([]input:(funcRef[first key funcSep(raze string[x])][`params]);Expected:(funcRef[first key funcSep(raze string[x])][`out]);Actual:(first ((value(a[first key a:funcSep(raze string[x])])) . funcRef[first key funcSep(raze string[x])][`params]))));
	value x]
	}
// Login Funcs
UserBase:([u:()];h:();p:();l:();t:();s:());

register:{[uX;hX;pX]$[uX in (key UserBase);`DupAccount;`UserBase upsert ([u:enlist uX];h:hX;p:enlist pX;l:1;t:.z.t;s:0)]};

chkLogin:{[h]first ?[`UserBase;((=;`h;h);(within;`t;(enlist;(-;`.z.t;00:15);`.z.t));(=;`l;1));();`u]};

logOut:{[h]![`UserBase;((=;`h;h);(within;`t;(enlist;(-;`.z.t;00:15);`.z.t)));0b;(enlist `l)!(enlist 0)];

// x = username; y = handle; z = password
// Login func with Check
login:{$[x in (exec u from UserBase);$[({(last exec p from UserBase where u=x)=y} [x;z]);newLogin[x;y;z];`PasswordError];`UsernameError]};
// Checkless Login called by login
newLogin:{nL:flip enlist each(`u`h`p`l`t`s)!(x;y;z;1;.z.t;(first exec max s from UserBase where u=x));`UserBase upsert nL};

toGoogleTable:{{x,"]"}"[","," sv {x,"]"}each {"[", x} each {"," sv x} each {x, \: "'"}each {"'", '\: x} each string value each () xkey x};i

randScoreGen:{x#`UserScore upsert (first rand key UserBase;`$("s",string[1+ rand 3],"t",string[1+ rand 3]);(2018.01.01+rand `int$.z.d-`int$2018.01.01))}
//randScoreGen each 20#1
// Obtains a String Array of total % score per section seperated by commas which can be turned into an array by the UI
getPrg:{"," sv string raze `$string 25*0^value each {(x[`s1];x[`s2];x[`s3];x[`s4])} select count distinct t by sec:`${2#x}each(string[t]) from UserScore where u=x}
// Converts a KDB Table into an Array Table Processed by GoogleVisualistion
tableToArray:{[Table]headerToArray:{"[",("[", \: ("," sv ("'", '\: (string cols x), '\ "'")), \ "]")};colsToArray:{[Table](-1_raze (("[", '\: ("," sv '(flip {[Type;Col]sep:$[Type=`s;"'";" "];sep, '\: (string Col), '\ sep} '[`$1 cut exec t from (meta Table);(flip value each Table)])), '\ "]"), '\ ",")),"]"};arrayTable:(headerToArray Table),",",colsToArray Table};




