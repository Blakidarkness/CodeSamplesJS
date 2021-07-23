const Querys     = require('../lib/querys');
const Agreement      = require('../models/agreement')
const agreementsCtrl = {};
const mkd       = require('mkdirp')


agreementsCtrl.renderagreements = async (req, res) =>
{
    enterprises = await Querys.getagreementsE();
    res.render('agreement/list',{enterprises});
}

agreementsCtrl.registerAgreement = async (req, res) =>
{

    console.log(req.body);
    if (!req.files || Object.keys(req.files).length === 0) {
        req.flash('message', 'Error');
        res.redirect('/home')
    }
    else {
        
        let route = 'agreements/'+req.body.rfc+'/';
        const made = mkd.sync('public/'+route);
        console.log(route+req.files.agreement.name);
        req.files.agreement.mv('public/'+route+req.files.agreement.name, function(err) {
            if (err)
            res.send(err);
          });

          console.log( req.files.agreement);
          console.log(route + req.files.agreement.name);

          Agreement.create({
            id_enterprise: req.body.rfc,
            status: 1,
            start_date: req.body.start.split("/").reverse().join("/"),
            end_date: req.body.fin.split("/").reverse().join("/"),
            route: route + req.files.agreement.name,
            singnature_ent : req.body.rfcEnterpriese,
            signature_sch : req.body.rfcAdministrative,
        }).then(
            (res.redirect('/agreements'))
        );
        

    }

    res.redirect('/home');
}

agreementsCtrl.agregaragreement = async (req, res) =>
{
    console.log(req.body);
    var name = req.body.name;
    var rfc = req.body.rfcModified;
    const personalE = await Querys.getPersonalE(req.body.rfcModified);
    const personalA = await Querys.getPersonal();
    console.log(personalE)
    res.render('agreement/add',{name,personalE,personalA,rfc})
}

agreementsCtrl.readAgreement = function(req, res)
{
    res.redirect(''+req.body.route);
}

module.exports = agreementsCtrl;